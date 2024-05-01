FROM oven/bun:latest
COPY bun.lockb package.json tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
RUN bun install
RUN bunx prisma generate
ENV PORT=8888
ENV DATABASE_URL="file:./dev.db"
EXPOSE ${PORT}
CMD ["bun", "start"]
