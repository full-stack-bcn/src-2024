import { $ } from 'bun';

console.log("Copying files...");
await $`rsync -avz ./ production:forums/ --exclude=node_modules`;

const cmds = [
  "cd forums",
  "docker compose down",
  "docker compose build",
  "docker compose up -d",
  "docker image prune"
];
await $`ssh production "${cmds.join("; ")}"`;