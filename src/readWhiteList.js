async function readWhiteList(fileName) {
  return new Promise((resolve) => {
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(fileName)
    });

    const whiteListedNames = [];

    lineReader.on('line', function (line) {
      whiteListedNames.push(line);
    });

    lineReader.on('close', function () {
      console.log('WhiteList read');
      return resolve(whiteListedNames);
    });
  })
}

module.exports = {
  readWhiteList
}