export interface TaskInterface {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  priority?: number;
  tags?: string[];
  webSiteUrl?: string;
}
