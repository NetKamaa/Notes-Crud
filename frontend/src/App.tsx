import { useEffect, useState } from "react";
import { getNotes } from "./api/notesApi";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";
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
    } catch {
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

      <NoteForm onNoteCreated={refreshNotes} />
      <NoteList notes={notes} onNoteDeleted={refreshNotes} />
    </>
  );
}

export default App;
