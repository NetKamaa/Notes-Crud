import { useState } from "react";
import { createNote } from "../api/notesApi";

interface INoteFormProps {
  onNoteCreated: () => Promise<void>;
}

export function NoteForm({ onNoteCreated }: INoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    await createNote({
      title,
      content,
    });

    setTitle("");
    setContent("");

    await onNoteCreated();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        ></input>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="content"
        ></textarea>

        <button type="submit">Add</button>
      </form>
    </>
  );
}
