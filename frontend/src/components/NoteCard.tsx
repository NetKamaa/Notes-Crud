import { deleteNote } from "../api/notesApi";
import type { INote } from "../types/notes";

interface INoteCard {
  note: INote;
  onNoteDeleted: () => Promise<void>;
}

export function NoteCard({ note, onNoteDeleted: onNoteDeleted }: INoteCard) {
  const handleDelete = async () => {
    await deleteNote(note.id);
    await onNoteDeleted();
  };

  return (
    <>
      <h1>{note.title}</h1>
      <h2>{note.content}</h2>
      <h4>{note.createdAt}</h4>
      <h4>{note.updatedAt}</h4>
      <p>{note.isPinned ? "Pinned" : "Not pinned"}</p>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
