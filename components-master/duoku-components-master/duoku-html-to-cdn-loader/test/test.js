const fs = require('fs');
const path = require('path');
const htmlToCDNLoader = require('../src/index');

var filePath = path.resolve('./index.html');
fs.readFile(filePath,'utf8',(err, data) => {
  if (err) throw err;
 var rs = htmlToCDNLoader(data);
 console.log('========start===========');
 console.log(rs);
 console.log('=========end==========');
});