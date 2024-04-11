let numbers = [];
for (let i = 0; i < 1000; i++) {
    numbers.push({ index: i, value: `item ${i}`});
}
db.numbers.insertMany(numbers);