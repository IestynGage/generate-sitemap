var path = require('path');
const fs = require('fs');

const folder = path.dirname('./test')

//protect against null/undefined
fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});