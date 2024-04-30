import { Router } from "express";
import { db } from "./db";

const router = Router();

/*
GET  /forums/
POST /forums/
GET  /forums/:id
PUT  /forums/:id
DELETE /forums/:id
*/

router.get("/", async (req, res) => {
  try {
    const forums = await db.forum.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        name: true,
        forumId: true,
      },
    });
    res.status(200).json({ forums });
  } catch (e) {
    res.status(500).json({ error: "Internal Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const forum = await db.forum.findUniqueOrThrow({
      where: { forumId: Number(id) },
    });
    res.status(200).json({ forum });
  } catch (e: any) {
    if (e.name === "NotFoundError") {
        return res.status(404).json({ message: `Not found.` });
    }
    res.status(500).json({ error: `Internal error` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    // Chequeo de los datos de entrada
    if (name === undefined || typeof name !== "string") {
      return res.status(400).json({ error: "Missing `name` field" });
    }
    const forum = await db.forum.create({
      data: { name },
    });
    res.status(201).json(forum);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Couldn't create forum. Come back later... ;)" });
  }
});

export default router;
