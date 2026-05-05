import { deleteNote, togglePinNote } from "../api/notesApi";
import type { INote } from "../types/notes";

interface INoteCard {
  note: INote;
  onNoteChanged: () => Promise<void>;
}

export function NoteCard({ note, onNoteChanged }: INoteCard) {
  const handleDelete = async () => {
    await deleteNote(note.id);
    await onNoteChanged();
  };

  const handlePin = async () => {
    await togglePinNote(note.id);
    await onNoteChanged();
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
      <button type="button" onClick={handlePin}>
        {note.isPinned ? "Pinned" : "Not pinned"}
      </button>
    </>
  );
}
