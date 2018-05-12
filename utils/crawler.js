const axios = require('axios');
const localhost = 'http://localhost:3001'



async function getPlebs(plopId) {
  if (!plopId) {
    return [];
  }
  
  let plebIds = [];

  let { data } = await axios.get(localhost + '/api/plop/plebs?plopId=' + plopId);
  plebIds = plebIds.concat(data.plebIds);
  let nextPage = data.nextPage;

  while (nextPage) {
    let { data } = await axios.get(localhost + '/api/plop/plebs?pageId=' + nextPage);

    plebIds = plebIds.concat(data.plebIds);
    nextPage = data.nextPage;
  }

  return plebIds;
}



module.exports = getPlebs;
