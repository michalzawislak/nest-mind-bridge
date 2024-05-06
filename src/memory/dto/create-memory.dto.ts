export class CreateMemoryDto {
  uuid: string;
  content: string;
  type: string;
  source: SourceType;
  created_at: string;
  synced: boolean;
  update: boolean;
}

export enum SourceType {
  Note = 'note',
  Resource = 'resource',
  Memory = 'memory'
}
