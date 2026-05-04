import type { TNote } from "../types/notes";

const API_URL = "http://localhost:4000/api/notes";

export async function getNotes(): Promise<TNote[]> {
  const response = await fetch(API_URL);

  if (!response) {
    throw new Error("Failed to load notes");
  }

  return response.json();
}
