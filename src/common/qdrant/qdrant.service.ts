import { OpenAIEmbeddings } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { QdrantClient } from '@qdrant/js-client-rest';
import { v4 as uuidv4 } from "uuid";
import { StructuredUserMessage } from '../models/structured-user-message';
import { Document } from "langchain/document";
import { CreateMemoryDto, SourceType } from 'src/memory/dto/create-memory.dto';

@Injectable()
export class QdrantService {
  private COLLECTION_NAME = 'memories';
  private qdrant = new QdrantClient({ url: process.env.QDRANT_URL });
  private embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });
  private result;
  private indexed;
  private collectionInfo;

  private async createCollection(): Promise<void> {
    try {
      await this.qdrant.createCollection(
        this.COLLECTION_NAME, 
        { vectors: { size: 1536, distance: 'Cosine', on_disk: true }}
      );
    } catch (error) {
      console.log('Collection already exists');
    }
  }

  public async addDocumentToCollection (message: CreateMemoryDto): Promise<void> {
    this.result = await this.qdrant.getCollections();
    this.indexed = this.result.collections.find((collection) => collection.name === this.COLLECTION_NAME);
    this.collectionInfo = this.indexed ? await this.qdrant.getCollection(this.COLLECTION_NAME) : null;
    if (!this.collectionInfo) {
      await this.createCollection();
    }
    const userMessage = new Document({
      pageContent: message.content,
      metadata: {
        uuid: message.uuid,
        content: message.content,
        type: message.type,
        source: message.source as SourceType,
        created_at: new Date().toISOString(),
        synced: false,
        update: false,
      }});
      
      const [embedding] = await this.embeddings.embedDocuments([userMessage.pageContent]);
      const point = {
        id: userMessage.metadata.uuid,
        payload: userMessage.metadata,
        vector: embedding,
    };

    const index = await this.qdrant.upsert(this.COLLECTION_NAME, {
      wait: true,
      batch: {
          ids: [point.id],
          vectors: [point.vector],
          payloads: [point.payload],
      },
    });
  }

  public async searchCollection(userMessage: string, limit = 1): Promise<any> {
    const queryEmbedding = await this.embeddings.embedQuery(userMessage);
    const search = await this.qdrant.search(this.COLLECTION_NAME, {
      vector: queryEmbedding,
      limit,
      params: {
          hnsw_ef: 128,
          exact: false,
      },
  });
  return search;
  }
}


