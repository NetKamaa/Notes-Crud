import type { INote } from "../types/notes";
import { NoteCard } from "./NoteCard";

interface INoteList {
  notes: INote[];
}

export function NoteList({ notes }: INoteList) {
  return (
    <>
      <div>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}
