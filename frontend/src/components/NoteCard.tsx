import { useState } from "react";
import { deleteNote, togglePinNote, updateNote } from "../api/notesApi";
import type { INote } from "../types/notes";

interface INoteCard {
  note: INote;
  onNoteChanged: () => Promise<void>;
}

export function NoteCard({ note, onNoteChanged }: INoteCard) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(note.title);
  const [editedContent, setEditedContent] = useState<string>(note.content);

  const handleDelete = async () => {
    await deleteNote(note.id);
    await onNoteChanged();
  };

  const handlePin = async () => {
    await togglePinNote(note.id);
    await onNoteChanged();
  };

  const handleUpdate = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      return;
    }

    await updateNote(note.id, { title: editedTitle, content: editedContent });

    setEditing(false);
    await onNoteChanged();
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  if (!isEditing) {
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
          {note.isPinned ? "Unpin" : "Pin"}
        </button>
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
      </>
    );
  } else {
    return (
      <>
        <input
          value={editedTitle}
          placeholder="title"
          onChange={(e) => setEditedTitle(e.target.value)}
        ></input>
        <textarea
          value={editedContent}
          placeholder="content"
          onChange={(e) => setEditedContent(e.target.value)}
        ></textarea>
        <button type="button" onClick={handleUpdate}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </>
    );
  }
}
