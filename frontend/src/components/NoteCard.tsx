import type { INote } from "../types/notes";

interface INoteCard {
  note: INote;
}

export function NoteCard({ note }: INoteCard) {
  return (
    <>
      <h1>{note.title}</h1>
      <h2>{note.content}</h2>
      <h4>{note.createdAt}</h4>
      <h4>{note.updatedAt}</h4>
      <p>{note.isPinned ? "Pinned" : "Not pinned"}</p>
    </>
  );
}
