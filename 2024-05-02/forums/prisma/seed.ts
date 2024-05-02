import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const backendForum = await db.forum.create({
  data: { name: "Backend Questions" },
});
console.log(`Created forum with ID = ${backendForum.forumId}`);

const frontendForum = await db.forum.create({
  data: { name: "Frontend Questions" },
});
console.log(`Created forum with ID = ${frontendForum.forumId}`);

const pauek = await db.user.create({
  data: {
    nick: "pauek",
    fullName: "Pau Fernández",
    messages: {
      createMany: {
        data: [
          { forumId: backendForum.forumId, text: "Hello, backend!" },
          { forumId: frontendForum.forumId, text: "Hello, frontend!" },
        ],
      },
    },
  },
});

console.log(`Created user "${pauek.nick}" (${pauek.userId})`);
