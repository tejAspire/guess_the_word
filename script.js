const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");
results=document.getElementsByClassName("results");
bg= document.getElementsByClassName("bg");
wrpper=document.getElementsByClassName("wrapper");
//input=document.getElementsByClassName("inputs");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];
document.addEventListener("visibilitychange",function(){
    if(document.hidden){
        document.title = "You're not looking at me!";
        #favi.src="https://icons8.com/icon/678/sad";
    }
    else{
        document.title="Word Riddle";

    }

function randomWord() {
    
    
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    bg[0].style.backgroundImage ="none";
    wrpper[0].style.boxShadow="0px 0px 20px #2509d7,0px 0px 40px #2509d7,0px 0px 80px #2509d7";
    results[0].innerText="Results";
    console.log(ranItem)
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    
    let key = e.target.value.toLowerCase();
    
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                    //inputs.querySelectorAll("input")[i].style.boxshadow=0px 0px 10px #0eda0e,
                    //0px 0px 10px #0eda0e,
                    //0px 0px 10px #0eda0e;
                    inputs.querySelectorAll("input")[i].style.boxShadow = "0px 0px 10px #0eda0e, 0px 0px 10px #0eda0e, 0px 0px 10px #0eda0e";




                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;

    }
    typingInput.value = "";
    //<iframe src="https://gifer.com/embed/4A5" width=480 height=320.400 frameBorder="0" allowFullScreen></iframe><p><a href="https://gifer.com">via GIFER</a></p>
    

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            results[0].innerText="congrats!"
            wrpper[0].style.boxShadow="0px 0px 20px #0eda0e,0px 0px 40px #0eda0e,0px 0px 80px #0eda0e";
            bg[0].style.backgroundImage ="url(https://usagif.com/wp-content/uploads/firework-12.gif)";
            
            
            //alert(`Congrats! You found the word ${word.toUpperCase()}`);
            
           // return randomWord();
        } else if(maxGuesses < 1) {
            results[0].innerText="Game over!";
            wrpper[0].style.boxShadow="0px 0px 20px #f90404,0px 0px 40px  #f90404,0px 0px 80px  #f90404";
            bg[0].style.backgroundImage ="url(https://media.tenor.com/Uj4RSxn_BTMAAAAC/game-over-glitch.gif)";
            bg[0].style.backgroundRepeat = "repeat";
            //alert("Game over! You don't have remaining guesses");
            
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
