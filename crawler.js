const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.log('enter username: ');

rl.on('line', (line) => {
  console.log(line);
})
