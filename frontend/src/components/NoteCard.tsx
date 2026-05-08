import { useState } from "react";
import { deleteNote, togglePinNote, updateNote } from "../api/notesApi";
import type { INote } from "../types/notes";

import { Button } from "./ui/button";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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

  const createdDate = new Date(note.createdAt).toLocaleString("ru-RU");
  const updatedDate = new Date(note.updatedAt).toLocaleString("ru-RU");

  if (isEditing) {
    return (
      <article className="rounded-2xl border bg-card/80 p-5 shadow-sm backdrop-blur transition-colors hover:bg-accent/40">
        <div className="space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Edit note</h3>

            <p className="text-sm text-muted-foreground">
              Update title or content and save changes.
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor={`edit-title-${note.id}`}>Title</FieldLabel>

            <FieldDescription>Change the title of this note.</FieldDescription>

            <Input
              id={`edit-title-${note.id}`}
              value={editedTitle}
              placeholder="Note title"
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor={`edit-content-${note.id}`}>Content</FieldLabel>

            <FieldDescription>
              Change the content of this note.
            </FieldDescription>

            <Textarea
              id={`edit-content-${note.id}`}
              value={editedContent}
              placeholder="Note content"
              className="min-h-28 resize-none"
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </Field>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>

            <Button type="button" onClick={handleUpdate}>
              Save changes
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-xl border bg-card p-5 shadow-sm transition-colors hover:bg-accent/30">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="wrap-break-word text-lg font-semibold leading-none">
                {note.title}
              </h3>

              {note.isPinned && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Pinned
                </span>
              )}
            </div>

            <p className="wrap-break-word text-sm leading-6 text-muted-foreground">
              {note.content}
            </p>
          </div>
        </div>

        <div className="space-y-1 border-t pt-3 text-xs text-muted-foreground">
          <p>Created: {createdDate}</p>
          <p>Updated: {updatedDate}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" type="button" onClick={handlePin}>
            {note.isPinned ? "Unpin" : "Pin"}
          </Button>

          <Button
            variant="outline"
            type="button"
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>

          <Button variant="destructive" type="button" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
