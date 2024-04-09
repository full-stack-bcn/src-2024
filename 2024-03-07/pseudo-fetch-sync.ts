
const response = fetchSync("https://randomuser.me");
const json = response.json();
console.log(json);