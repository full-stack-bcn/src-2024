import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./errors";

const router = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const forumBodySchema = z.object({
  name: z.string().min(5).max(200),
});

router.get(
  "/",
  catchErrors(async (_, res) => {
    const forums = await db.forum.findMany({
      orderBy: { createdAt: "asc" },
      select: { name: true, forumId: true },
    });
    send(res).ok(forums);
  })
);

router.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: forumId } = idParamSchema.parse(req.params);
    const forum = await db.forum.findUniqueOrThrow({ where: { forumId } });
    send(res).ok(forum);
  })
);

router.post(
  "/",
  catchErrors(async (req, res) => {
    const data = forumBodySchema.parse(req.body);
    const forum = await db.forum.create({ data });
    send(res).createOk(forum);
  })
);

router.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: forumId } = idParamSchema.parse(req.params);
    const forumData = forumBodySchema.parse(req.body);
    const updatedForum = await db.forum.update({
      where: { forumId },
      data: forumData,
    });
    send(res).ok(updatedForum);
  })
);

router.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: forumId } = idParamSchema.parse(req.params);
    const deletedForum = await db.forum.delete({ where: { forumId } });
    send(res).ok(deletedForum);
  })
);

export default router;
