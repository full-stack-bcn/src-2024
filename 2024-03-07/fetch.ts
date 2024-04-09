fetch("https://randomuser.me/api/?results=20")
  .then((response) => response.blob())
  .then((json) => console.dir(json, { depth: null }));

  