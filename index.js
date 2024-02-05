// const csvtojson = require('csvtojson');
// const fs = require('fs');

// const match = '/home/pagidala-venkata-subbareddy/Desktop/Desktop/Mountblue/IPL_PROJECT/src/data/matches.csv';
// const deliveries = '/home/pagidala-venkata-subbareddy/Desktop/Desktop/Mountblue/IPL_PROJECT/src/data/deliveries.csv';

// const converter=(csvFilePath,name)=>{
// csvtojson()
//   .fromFile(csvFilePath)
//   .then((jsonArray) => {
//     // Now 'jsonArray' contains an array of JSON objects

//     // If you want to write the JSON array to a file, you can do so
//     fs.writeFileSync(`/home/pagidala-venkata-subbareddy/Desktop/Desktop/Mountblue/IPL_PROJECT/src/public/output`+ String(name)+`.json`, JSON.stringify(jsonArray, null, 2));
//   })
//   .catch((error) => {
//     console.error('Error converting CSV to JSON:', error);
//   });
// }

// const name1="deliveries"
// const name='matches'
// const matchesData=converter(match,name)
// const deliveriesData=converter(deliveries,name1)



const csvtojson = require('csvtojson');
const fs = require('fs');

const match = './src/data/matches.csv';
const deliveries = './src/data/deliveries.csv';

const converter=(csvFilePath,name)=>{
csvtojson()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    // Now 'jsonArray' contains an array of JSON objects

    // If you want to write the JSON array to a file, you can do so
    fs.writeFileSync(`./src/public/output/`+ String(name)+`.json`, JSON.stringify(jsonArray, null, 2));
  })
  .catch((error) => {
    console.error('Error converting CSV to JSON:', error);
  });
}

const name1="deliveries"
const name='matches'
const matchesData=converter(match,name)
const deliveriesData=converter(deliveries,name1)

