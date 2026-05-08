import { useEffect, useState } from "react";
import { getNotes } from "./api/notesApi";
import { NoteForm } from "./components/NoteForm";
import { NoteList } from "./components/NoteList";
import { ProfileLinks } from "./components/ProfileLinks";
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
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          <ProfileLinks />

          <NoteForm onNoteCreated={refreshNotes} />

          {loading && (
            <p className="text-center text-sm text-muted-foreground">
              Loading notes...
            </p>
          )}

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          {!loading && !error && notes.length === 0 && (
            <div className="rounded-xl border border-dashed bg-card px-6 py-10 text-center">
              <p className="text-sm font-medium">No notes yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first note using the form above.
              </p>
            </div>
          )}

          {!loading && !error && notes.length > 0 && (
            <NoteList notes={notes} onNoteChanged={refreshNotes} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
