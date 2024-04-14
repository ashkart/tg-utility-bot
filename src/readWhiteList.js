import fs from 'fs';
import readline from 'readline';

async function readWhiteList(fileName) {
  return new Promise((resolve) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(fileName)
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

async function readAnswer(fileName) {
  return new Promise((resolve) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(fileName)
    });

    let answerText = '';

    lineReader.on('line', function (line) {
      answerText += `${line}\n`;
    });

    lineReader.on('close', function () {
      console.log('Answer text is:\n');
      console.log(answerText);
      return resolve(answerText);
    });
  })
}

export {
  readWhiteList,
  readAnswer
}