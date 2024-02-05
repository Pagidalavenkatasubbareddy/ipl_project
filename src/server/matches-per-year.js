// const matchesData = require('/home/pagidala-venkata-subbareddy/Desktop/Desktop/Mountblue/IPL_PROJECT/src/public/outputdeliveries.json')
// const fs = require("fs")  // ekada  manam import chesukuntunam node.js file kalupukunakii fs =>means file system..

// // 1.Number of matches played per year for all the years in IPL.

// const res = matchesData.reduce((acc, element) => {    // ekada manam res anti result ani danilo matchdata nii reduce method tho iterate chesthamuu each element nii 
//   if (element.season) {                              // e block lo element ki season anadii vaka property ga undii
//     if (element.season in acc) {                     // ekada season untii dani property exists accumalator lo store chesukuntunadii 
//       acc[element.season] += 1                      // yes ayithi accumalator lo increse avuthundii season 
//     } else {
//       acc[element.season] = 1                       // no ayithiii aa season yii count chesukuntundii 
//     }
//   }
//   return acc;
// }, {})   // ekada {} acc means accumalator is an empty valu ani artham .


// fs.writeFileSync(`/home/pagidala-venkata-subbareddy/Desktop/Desktop/Mountblue/IPL_PROJECT/src/public/output/matchesWonPerYear.json`, JSON.stringify(res, null, 2));
//                       // ekaada json.stringyfy anandii javascript to json file ga change chesthundii and null,2 means  for understanding purpose kii with indentation of 2 spaces.
// console.log(res);


const matchesData = require('./../public/output/matches.json')
const fs = require("fs")

const res = matchesData.reduce((acc, element) => {
  if (element.season) {
    if (element.season in acc) {
      acc[element.season] += 1
    } else {
      acc[element.season] = 1
    }
  }
  return acc
}, {})


fs.writeFileSync('./../public/output/matchesWonPerYear.json', JSON.stringify(res, null, 2));

console.log(res);


