import type { INote } from "../types/notes";
import { NoteCard } from "./NoteCard";

interface INoteList {
  notes: INote[];
  onNoteDeleted: () => Promise<void>;
}

export function NoteList({ notes, onNoteDeleted: onNoteDeleted }: INoteList) {
  return (
    <>
      <div>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </>
  );
}
