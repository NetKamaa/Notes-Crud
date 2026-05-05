import type { ICreateNoteData, INote } from "../types/notes";

const API_URL = "http://localhost:4000/api/notes";

export async function getNotes(): Promise<INote[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load notes");
  }

  return response.json();
}

export async function createNote(data: ICreateNoteData): Promise<INote> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return response.json();
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}
