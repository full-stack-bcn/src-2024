FROM imbios/bun-node
COPY bun.lockb package.json tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
RUN bun install
RUN bunx prisma generate
EXPOSE ${PORT}
CMD ["bun", "start"]
