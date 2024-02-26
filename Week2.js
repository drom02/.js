const fs = require('fs');
function readFileAsync(filePath) {
  return new Promise((resolve,reject)=>{
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file from disk: ${err}`);
      } else {
        resolve(data);
      }
    });
  });   
  }
function writeFileAsync(inputString,path){
    fs.writeFile(path, inputString, 'utf8', (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log('File written successfully');
        }
      });
}
async function parseSettings(){
  try{
    var source = await readFileAsync('./settings.txt');
    var inputLoc = source.split(";")[0].split(":")[1];
    var target = source.split(";")[1].split(":")[1];
    try{var inputText = await readFileAsync(inputLoc)
      writeFileAsync(inputText,target);
    }catch(err){
      console.log(err)
    }
  
  }catch(err){
    console.log(err)
  }
  
}
parseSettings();

