import type { INote } from "../types/notes";
import { NoteCard } from "./NoteCard";

interface INoteList {
  notes: INote[];
  onNoteChanged: () => Promise<void>;
}

export function NoteList({ notes, onNoteChanged }: INoteList) {
  return (
    <>
      <div>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onNoteChanged={onNoteChanged} />
        ))}
      </div>
    </>
  );
}
