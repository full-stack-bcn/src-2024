import { Router } from "express";
import { db } from "./db";
import { send } from "./response";

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
    send(res).ok(forums);
  } catch (e) {
    send(res).internalError(`Could not get forums.`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const forum = await db.forum.findUniqueOrThrow({
      where: { forumId: Number(id) },
    });
    send(res).ok(forum);
  } catch (e: any) {
    if (e.name === "NotFoundError") {
        return send(res).notFound();
    }
    send(res).internalError(`Internal error`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    // Chequeo de los datos de entrada
    if (name === undefined || typeof name !== "string") {
        return send(res).badRequest(`Missing 'name' field`);
    }
    const forum = await db.forum.create({
      data: { name },
    });
    send(res).createOk(forum);
  } catch (e) {
    send(res).internalError(`Couldn't create forum.`);
  }
});

export default router;
