import fs from'fs';
import util from 'util';
    async function promiseFactory(path,order){
        const output = new Array();
        for(let i = 0; i<order;i++){
            var c = new  Promise((resolve,reject)=>{
                let out =   'Soubor'+ ' ' + i;
                fs.writeFile(path + i +".txt",out,'utf8', (err) => {
                    if (err) {
                      reject('Error writing file ' + i);
                    } else {
                      resolve('File '+ i +' written successfully');
                    }
                  });
            })
            output.push(c)
        }
         return output;
    }
   async function fin(){
        try{
         var out = promiseFactory("Week3\\",5);
         Promise.all(await out).then((values) => {
            console.log(values)});
        }catch(err){
            console.log(err);
        }
        
    }
    fin();
