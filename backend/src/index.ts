import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { prisma } from "./prisma";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working" });
});

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      orderBy: [
        {
          isPinned: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load notes",
    });
  }
});

app.get("api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return res.status(404).json({
        message: "No note with this ID",
      });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load note",
    });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
    });
  }
});

app.patch("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const note = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update note",
    });
  }
});

app.patch("/api/notes/:id/pin", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return res.status(404).json({
        message: "No note with this ID",
      });
    }

    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        isPinned: !note.isPinned,
      },
    });

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: "Failed to pinned or unpinned note",
    });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.note.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
