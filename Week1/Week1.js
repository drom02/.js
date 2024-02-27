let randomNumber = Math.floor(Math.random() * 10) + 1;
let triesLeft = 3;
console.log(randomNumber);
function readAndEvaluate(text){
    let userResponse = prompt(text, "number");
    if (userResponse==randomNumber ) {
        console.log("You quessed the correct number. As a reward, take a cookie." );
     } else {
        triesLeft--;
        if(triesLeft>0){
            var text2 = ("Wrong. No cookie for you. But, you can try again. You have " + triesLeft+ " tries left.");
            readAndEvaluate(text2);
        }else{
            console.log("You are out of tries. Game over.");
        }
            
        }
}
readAndEvaluate("Guess number between 1 and 10:")
