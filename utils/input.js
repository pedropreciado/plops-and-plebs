const axios = require('axios');
const merge = require('lodash/merge');
const readline = require('readline');

const Plop = require('../models/plop');
const getPlebIds = require('./crawler');
const localhost = 'http://localhost:3001';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let max = 50000;
let count = 0;

async function addPlebsToPlop(masterPlopId, ADDED = {}) {
  
}

console.log('Enter plopname: ');
rl.on('line', addPlebsToPlop)
