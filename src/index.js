#!/usr/bin/node

var path = require('path');
const fs = require('fs');

//protect against null/undefined

const readFiles = (filePath) => {
  let files = [];
  const fileStats = fs.lstatSync(filePath);

  console.log(filePath, fileStats.isDirectory())
  if (fileStats.isDirectory()) {
    fs.readdirSync(filePath).forEach(file => {
      const newFilePath = filePath + "/" + file;
      files = files.concat(readFiles(newFilePath));
    });
    return files;
  } else {
    return isHtmlFile(filePath) ? [filePath] :[]
  }
}

const isHtmlFile = (path) => {
  return path.endsWith(".html");
}

const a = readFiles('./src/test/resource/simpleExampleTwo');

console.log(a)

// module.exports = readFiles