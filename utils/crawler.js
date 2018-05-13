const axios = require('axios');
const localhost = 'http://localhost:3001'


async function getPlebIds(id) {
  let plebIds = [];
  let { data } = await axios.get(localhost + `/api/plop/plebs?plopId=${id}`);
  let nextPage = data.nextPage;
  plebIds = plebIds.concat(data.plebIds);

  while (nextPage) {
    let { data } = await axios.get(localhost + `/api/plop/plebs?pageId=${nextPage}`)
    nextPage = data.nextPage;
    plebIds = plebIds.concat(data.plebIds);
  }

  return plebIds;
}



async function fetchPleb(id) {
  if (!!store[id]) {
    return store[id];
  }

  let { data } = await axios.get(localhost + `/api/plop?id=${id}`);

  return data;
}



async function getPlebs(id) {
  let { data } = await axios.get(`http://localhost:3001/api/plop?id=${id}`)

  if (!data.plebCount) {
    return data;
  }

  store[id] = true;

  let plebIds = await getPlebIds(data._id);
  associations[id] = plebIds;

  for (let i = 0; i < plebIds.length; i++) {
    let plebId = plebIds[i];

    if (!store[plebId]) {
      store[plebId] = true;
      associations[plebId] = await getPlebIds(plebId);
    }
  }

  for (let id in store) {
    let pleb = store[id];

    if (typeof pleb === 'boolean') {
      let { data } = await axios.get(localhost + `/api/plop?id=` + id);
      store[id] = data;
    }
  }

  for (let id in associations) {
    let ids = associations[id];
    let plop = store[id];

    ids.forEach((id) => {
      plop.plebs.push(store[id]);
    })
  }

  return store[id];
}

let associations = {};
let store = {};

async function driver() {
  let result = await getPlebs('5af7948733f0d27863f3a420');
  
  console.log('username:', result.username);
  console.log('result:', result);
  console.log('followers:', result.plebs.map((pleb) => { return pleb.username}));
}

driver();

module.exports = getPlebs;
