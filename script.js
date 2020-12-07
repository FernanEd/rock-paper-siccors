// Game

let gameState = false; // 
let personTurn = false; // Can hover and select, or cannot hover and select
let personWins = 0;
let computerWins = 0;

//Start button

let play = document.querySelector("#play");
let playBtn = play.firstElementChild;

playBtn.addEventListener("click", () => {
    play.style.animationName = "fade";
    play.style.animationDuration = "1s";
    play.style.animationTimingFunction = "linear";
    play.addEventListener("animationend", () => {
        play.remove();
        //Start game
        gameState = true;
        personTurn = true;
    })
})

// Controls

let personControls = document.querySelector("#person-controls").children;

Array.from(personControls).forEach(control => {
    control.addEventListener("click", e => {
        if (personTurn){
            control.classList.add("person-selected");
            evaluate(control.id);
            endTurn();
        }
    });
});

// Game Logic

function endTurn(){
    Array.from(personControls).forEach(control => {
        // Remove hover effect
        control.classList.remove("person-selectable");

        // Remove clickeability
        personTurn = false;
    });
}

function evaluate(selection){
    // Generate Computer move
    let computerOptions = ['computer-rock', 'computer-paper', 'computer-scissors'];
    let randomIndex = Math.floor(Math.random() * computerOptions.length); 
    let computerSelect = computerOptions[randomIndex]; 
    let winner = 0; // 0 - Computer 1 - Person 2 - Tie

    // Make the computer control change color
    let computerControl = document.querySelector(`#${computerSelect}`);
    computerControl.classList.add('computer-selected');

    // Check who wins depending on what they choosed, if non tie
    if ((computerSelect == "computer-rock") && (selection == "person-scissors") 
        || (computerSelect == "computer-paper") && (selection == "person-rock") 
        || (computerSelect == "computer-scissors") && (selection == "person-paper")){
        winner = 0
    }
    else if ((computerSelect == "computer-rock") && (selection == "person-paper") 
        || (computerSelect == "computer-paper") && (selection == "person-scissors") 
        || (computerSelect == "computer-scissors") && (selection == "person-rock")){
        winner = 1;
    }
    else{ 
        winner = 2;

    }

    addFlag(winner);

    // Reset after 1 second
    setTimeout(resetGame, 1200);
}

// Reset game

function resetGame(){
    console.log("jaja");

    //Restore person controls
    Array.from(personControls).forEach(control => {
        // Remove selected
        control.classList.remove("person-selected");

        // Restore hover effect
        control.classList.add("person-selectable");
    });

    //Restore computer controls
    let computerControls = document.querySelector("#computer-controls").children;

    Array.from(computerControls).forEach(control => {
        // Remove selected
        control.classList.remove("computer-selected");
    });

    gameState = true;
    personTurn = true;
}



// Flags

const FLAG_WIN = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-flag-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
</svg>`

let personFlags = document.querySelector("#person-wins");

let computerFlags = document.querySelector("#computer-wins");

function addFlag(winner){
    if (winner == 0)
    {
        computerFlags.innerHTML += FLAG_WIN;
        computerWins ++;
    }
    else if (winner == 1){
        personFlags.innerHTML += FLAG_WIN;
        personWins ++;
    }
}
