#!/usr/bin/node

var path = require('path');
const fs = require('fs');

//protect against null/undefined

const readFiles = (directory) => {
  let files = []
  const directoryStats = fs.lstatSync(directory);
  if (directoryStats.isDirectory()) {
    console.log("is directory", directory)
    const folder = path.dirname(directory + "/.");
    fs.readdir(folder, (err, files) => {
      files.forEach(file => {
        console.log("file", file)
        files.concat(readFiles(directory + "/" + file))
      });
    });
  } else {
    console.log("is file", directory)
    files[0] = directory;
  }
  return files;
}

const a = readFiles('src/test/resource/simpleExampleTwo');

console.log(a)