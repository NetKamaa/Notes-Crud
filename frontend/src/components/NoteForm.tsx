import { useState } from "react";
import { createNote } from "../api/notesApi";

import { Button } from "./ui/button";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
      <section className="rounded-2xl border bg-card/80 p-6 shadow-sm backdrop-blur">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Create note</h2>

            <p className="text-sm text-muted-foreground">
              Add a title and content for your new note.
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="input-title">Title</FieldLabel>

            <FieldDescription>
              Short and clear title for your note.
            </FieldDescription>
            <Input
              id="input-title"
              value={title}
              placeholder="For example: Learn Tailwind layout."
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </Field>

          <Field>
            <FieldLabel htmlFor="input-content">Content</FieldLabel>

            <FieldDescription>Main text of your note.</FieldDescription>
            <Textarea
              id="input-content"
              value={content}
              placeholder="Write your note here..."
              className="min-h-32 resize-none"
              onChange={(e) => setContent(e.target.value)}
            ></Textarea>
          </Field>

          <Button variant="outline" type="submit" className="w-full">
            Add
          </Button>
        </form>
      </section>
    </>
  );
}
