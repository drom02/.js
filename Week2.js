console.log("Hi")
const fs = require('fs');
function readFileAsync(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file from disk: ${err}`);
      } else {
        console.log(data);
      }
    });
  }
  const data = "Hello, this is a test file.";

// Asynchronously writing data to a file
function writeFileAsync(inputString,path){
    fs.writeFile(path, inputString, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log('File written successfully');
        }
      });
}
writeFileAsync("testing testing",'C:/Users/matej/VSE/.js/test.js.txt')

