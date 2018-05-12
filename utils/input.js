const axios = require('axios');
const merge = require('lodash/merge');
const readline = require('readline');
const localhost = 'http://localhost:3001'

const Plop = require('../models/plop');
const getPlebIds = require('./crawler');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let max = 50000;
let count = 0;

async function addPlebsToPlop(masterPlopId, ADDED = {}) {
  ADDED[String(masterPlopId)] = true;

  console.log(ADDED);

  if (!!ADDED[String(masterPlopId)]) {
    return ADDED[String(masterPlopId)];
  }

  let { data } = await axios.get(localhost + '/api/plop?id=' + masterPlopId);

  if (data.plebCount === 0) {
    return data;
  }

  let plebIds = await getPlebIds(masterPlopId);
  
  let plebs = await Promise.all(plebIds.map((id) => {
    ADDED[id].plebs = addPlebsToPlop(id, ADDED);

    return ADDED[id].plebs;
  }))

  data.plebs = plebs;

  return data;
}

console.log('Enter plopname: ');
rl.on('line', addPlebsToPlop)
