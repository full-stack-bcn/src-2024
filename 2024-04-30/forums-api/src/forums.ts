import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { z } from "zod";

const router = Router();

/*
    GET  /forums/
    POST /forums/       <body>
    GET  /forums/:id
    PUT  /forums/:id    <body>
    DELETE /forums/:id
*/

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const forumBodySchema = z.object({
  name: z.string().min(5).max(200),
});

router.get("/", async (req, res) => {
  try {
    const forums = await db.forum.findMany({
      orderBy: { createdAt: "asc" },
      select: { name: true, forumId: true },
    });
    send(res).ok(forums);
  } catch (e) {
    send(res).internalError(`Could not get forums.`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id: forumId } = idParamSchema.parse(req.params);
    const forum = await db.forum.findUniqueOrThrow({ where: { forumId } });
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
    const data = forumBodySchema.parse(req.body);
    const forum = await db.forum.create({ data });
    send(res).createOk(forum);
  } catch (e) {
    send(res).internalError(`Couldn't create forum.`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // 1. Obtener los datos entrada:
    //    - Parámetros (/abc/:x/def/:y)
    //    - Request body.
    //    - Query parameters.

    // 2. Validar datos (si mal -> Bad Request)
    //    - usar validador
    const { id: forumId } = idParamSchema.parse(req.params);
    const forumData = forumBodySchema.parse(req.body);

    // 3. Consultas/Modificaciones con Prisma
    //    - Gestión de errores (excepciones).
    //    - Ocultar campos que no queremos mostrar
    const updatedForum = await db.forum.update({
      where: { forumId },
      data: forumData,
    });

    // 4. Devolver resultado
    //    - Ocultar campos que no queremos mostrar
    //    - Devolver en un formato estándar.
    send(res).ok(updatedForum);
  } catch (e) {}
});

export default router;
