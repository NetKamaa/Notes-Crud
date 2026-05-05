export interface INote {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateNoteData {
  title: string;
  content: string;
}
