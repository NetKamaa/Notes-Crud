export interface INote {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INoteData {
  title: string;
  content: string;
}
