
async function suma(a: number, b: number) {
  return a + b;
}

const loadUserList = async (numUsers: number) => {
  const response = await fetch(`https://randomuser.me/api?results=${numUsers}`);
  const { results: users } = await response.json() as { results: any[] };
  return users;
}

const users = await loadUserList(2);
console.dir(users, { depth: 1 });