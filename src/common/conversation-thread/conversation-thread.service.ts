import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConversationThreadService {
  private conversationThreads: ConversationThreads;
  private threadCleanupTimeouts: Record<string, NodeJS.Timeout>;

  constructor() {
    this.conversationThreads = {};
    this.threadCleanupTimeouts = {};
  }

  createThread(): string { 
    const threadId = uuidv4();
		const autoDeleteTimeMs: number = 600000; // Automatic thread deletion after 10 minutes
		if (!this.conversationThreads[threadId]) {
      this.conversationThreads[threadId] = {
        userQueries: [],
        AIResponses: []
      };

			// Set timeout to delete the thread after a specified time
      this.threadCleanupTimeouts[threadId] = setTimeout(() => {
        this.deleteThread(threadId);
      }, autoDeleteTimeMs);
			return threadId;
    } else {
      throw new Error('Thread already exists');
    }
  }

  addUserQuery(threadId: string, query: string): void {
    if (this.conversationThreads[threadId]) {
      this.conversationThreads[threadId].userQueries.push(query);
    } else {
      throw new Error('Thread does not exist');
    }
  }

  addAIResponse(threadId: string, response: string): void {
    if (this.conversationThreads[threadId]) {
      this.conversationThreads[threadId].AIResponses.push(response);
    } else {
      throw new Error('Thread does not exist');
    }
  }

  getUserQueries(threadId: string): string[] {
    if (this.conversationThreads[threadId]) {
      return this.conversationThreads[threadId].userQueries;
    } else {
      throw new Error('Thread does not exist');
    }
  }

  getAIResponses(threadId: string): string[] {
    if (this.conversationThreads[threadId]) {
      return this.conversationThreads[threadId].AIResponses;
    } else {
      throw new Error('Thread does not exist');
    }
  }

  deleteThread(threadId: string): void {
    if (this.conversationThreads[threadId]) {
      delete this.conversationThreads[threadId];

			// Cancel the thread cleanup timeout if it exists
      if (this.threadCleanupTimeouts[threadId]) {
        clearTimeout(this.threadCleanupTimeouts[threadId]);
        delete this.threadCleanupTimeouts[threadId];
      }
    } else {
      throw new Error('Thread does not exist');
    }
  }

  getAllThreads(): ConversationThreads {
    return this.conversationThreads;
  }

}
