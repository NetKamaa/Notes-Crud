import { useEffect, useState } from "react";
import { getNotes } from "./api/notesApi";
import { NoteForm } from "./components/NoteForm";
import type { INote } from "./types/notes";

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getNotes();

      setNotes(data);
    } catch (error) {
      setError("Unable to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    getNotes()
      .then((data) => {
        if (!ignore) {
          setNotes(data);
        }
      })
      .catch(() => {
        if (!ignore) {
          setError("Unable to load notes");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {loading && <p className="text-slate-600">Loading...</p>}

      {error && <p className="text-shadow-slate-600">{error}</p>}

      {!loading && !error && notes.length === 0 && (
        <p className="text-slate-600">No Notes yet</p>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <article key={note.id} className="rounded-xl bg-amber-400 p-4">
            <div className="mb-2 flex items-center gap-2">
              {note.isPinned && <span>Pined</span>}
              <h2 className="text-xl font-semibold">{note.title}</h2>
            </div>

            <p className="text-slate-300">{note.content}</p>
          </article>
        ))}
      </div>

      <NoteForm onNoteCreated={refreshNotes} />
    </>
  );
}

export default App;
