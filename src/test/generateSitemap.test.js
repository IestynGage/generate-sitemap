const readFiles = require("../index");

test('can read from simpleExampleOne', () => {
  const result = readFiles("./src/test/resource/simpleExampleOne")
  console.log(result)
});

test('can read from simpleExampleTwo', () => {
  const result = readFiles("./src/test/resource/simpleExampleTwo")
  console.log(result)
});