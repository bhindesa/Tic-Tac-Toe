/*----- constants -----*/
const areas = {
    "area1": 1,
    "area2": 2,
    "area3": 3,
    "area4": 4,
    "area5": 5,
    "area6": 6,
    "area7": 7,
    "area8": 8,
    "area9": 9
}
const winningCombinations = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [4,5,6],
    [3,5,7],
    [3,6,9],
    [7,8,9]
];

const player ={
    '1' : {
            turn: 1,
            color: "orange",
            sign : "X"
            },
    '2' : {
            turn: 2,
            color: "red",
            sign : "O"
            }
};


/*----- app's state (variables) -----*/
let board;
let turn;
let winner;
let gameStarted = false;
let gameRestarted = false;
let currentArea;

/*----- cached element references -----*/
const messageAreaEl = $('#messageArea');
const resultAreaEl = $('#resultArea');
const gamePlayAreaEl = $('#gamePlayArea > div');
const resetBtnEl = $('#resetBtn');
const playBtnEl = $('#playBtn')



/*----- event listeners -----*/
playBtnEl.on('click', playBtnHandler);
resetBtnEl.on('click',resetBtnHandler);
gamePlayAreaEl.on('click', gamePlayAreaHandler);

/*----- functions -----*/
function disableGridForClicks(){
    for(let i = 0; i < gamePlayAreaEl.length; i++){
        gamePlayAreaEl[i].classList.value += ' deactivateArea';
    }
    messageAreaEl.html(`<h1>Game Finished!</h1>`); 
    $(`#${resultAreaEl[0].id}`)
    .css(
        {
            'visibility': 'visible'
        }
    );
}

function checkIfDraw(){
    if(board.every((cell) => cell !== '')){
        resultAreaEl.html('<h1>Game is Draw!</h1>');
        disableGridForClicks();
    }
}  

function setWinner(){
    resultAreaEl.html(`<h1>${winner}, Wins this Game!</h1>`); 
    disableGridForClicks();
}

function playBtnHandler(){
    if(!winner){
        gameStarted = true;
        playBtnEl.prop('disabled', true);
        $(`#${resultAreaEl[0].id}`)
        .css(
        {
            'visibility':'hidden',
            'color': ``,
            'background-color': "" 
        }
        );
        render();
    }
    else{
        resultAreaEl.html('<h1>Please click Reset to restart game!</h1>');
    }
    
}

function resetBtnHandler(){
    for (let i = 0; i < gamePlayAreaEl.length; i++) {
        gamePlayAreaEl[i].attributes[1].nodeValue = 'areaBtns clearArea';
        $(`#${gamePlayAreaEl[i].id}`)
        .css(
            {
                'color': ``,
                'background-color': "" 
            }
        );
    }
    gamePlayAreaEl.html('');
    gameStarted = false;
    winner=null;
    gameRestarted = true
    init();
}

function gamePlayAreaHandler(event){

    if(gameStarted){
        currentArea = $(this).attr("id");
        for (let i = 0; i < gamePlayAreaEl.length; i++) {
    
            //this check if we clicked any of 9 cells in game play area
            if(currentArea === gamePlayAreaEl[i].id){
                if(player[1].turn === turn){
    
                    //checking if element already has text then return back and do nothing 
                    // otherwise add 'X' or 'O' based on player.
                    if(['X','O'].includes(gamePlayAreaEl[i].innerText)){
                        return;
                    }
                    else{
                        messageAreaEl.html('<h1>Player 1 (X), please play your turn!</h1>'); 
                        gamePlayAreaEl[i].innerText += `${player[1].sign}`;
                        $(`#${gamePlayAreaEl[i].id}`)
                        .css(
                            {
                                'color': `${player[1].color}`,
                                'background-color':"#ff000024"
                            }
                        );                      
                        board[i]= player[1].sign ;
                        
                        //Checking if combination matches with current board value, if matches then current player WINS.
                        for(let patterns of winningCombinations){
                            if(patterns.every(id => board[id-1] === player[1].sign)){
                                winner = 'Player 1 (X)'
                            }
                        }
                        turn = 2;
                    }
                }
                else{
    
                    //checking  if element already has text then return back and do nothing 
                    // otherwise add 'X' or 'O' based on player.
                    if(['X','O'].includes(gamePlayAreaEl[i].innerText)){
                        return;
                    }
                    else{
                        messageAreaEl.html('<h1>Player 2 (O), please play your turn!</h1>');
                        gamePlayAreaEl[i].innerText += `${player[2].sign}`;
                        $(`#${gamePlayAreaEl[i].id}`)
                        .css(
                            {
                                'color': `${player[2].color}`,
                                'background-color':'rgb(49 94 194 / 27%)' 
                            }
                        );
                        board[i]= player[2].sign ;
    
                        //Checking if combination matches with current board value, if matches then current player WINS.
                        for(let patterns of winningCombinations){
                            if(patterns.every(id => board[id-1] === player[2].sign)){
                                winner = 'Player 2 (O)'
                            }
                        }
                        turn = 1;
                    }
                }
    
                if(winner){
                    setWinner();
                }
                else {
                    checkIfDraw();
                }
            }
            
        }
    }
}


function init(){
    board=['','','','','','','','',''];
    messageAreaEl.html("<h1>Welcome to Tic Tac Toe by Sarb Bhinder</h1>");
    if(!winner){
        if(gameRestarted){
            gameStarted = true;
            playBtnEl.prop('disabled', true);
            resultAreaEl.html(``);
            $(`#${resultAreaEl[0].id}`)
            .css(
                {
                    'visibility':'hidden',
                    'color': ``,
                    'background-color': "" 
                }
            );
        }
        else{
            resultAreaEl.html(`<h1>Click on Play to start the game!</h1>`); 
        }
    }
    gamePlayAreaEl.html('');
    turn = player[1].turn;
    
}

function render(){
    messageAreaEl.html("<h1>Player 1 (X), please start the game </h1>")
    winner=null;
}



init();