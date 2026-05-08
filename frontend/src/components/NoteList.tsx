import type { INote } from "../types/notes";
import { NoteCard } from "./NoteCard";

interface INoteList {
  notes: INote[];
  onNoteChanged: () => Promise<void>;
}

export function NoteList({ notes, onNoteChanged }: INoteList) {
  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Your notes</h2>

            <p className="text-sm text-muted-foreground">
              {notes.length} {notes.length === 1 ? "note" : "notes"} in total
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onNoteChanged={onNoteChanged} />
          ))}
        </div>
      </section>
    </>
  );
}
