const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const xPlayerDisplay = document.querySelector('#xPlayerDisplay');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restartBtn');

let player = 'X';
let isPauseGame = false;
let isGameStart = false;

//Win input
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', ''];

//win conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [3, 4, 5],
    [0, 4, 8], [2, 4, 6]];

//click eventListeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index))
})

function tapCell(cell, index) {
    if(cell.textContent == '' &&
    !isPauseGame
    ) {
        isGameStart = true;
        updateCell(cell, index)
        if (!checkWinner()) {
            changePlayer();
            randomPick()
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player == 'X') ? '#41badf' : '#e63947';
}

function changePlayer() {
    player = (player == 'X') ? 'O' : 'X';
}

function randomPick() {
    isPauseGame = true;
    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * inputCells.length)
        } while (
            inputCells[randomIndex] != ''
        )
        updateCell(cells[randomIndex], randomIndex, player)
        if(!checkWinner()) {
            changePlayer()
            isPauseGame = false
            return
        }
        player = (player == 'X') ? 'O' : 'X'
    }, 1000)
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        if (inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player 
        ) {
            declareWinner([a, b, c])
            return true;
        }
    }

    //draw
    if(inputCells.every(cell => cell != '')) {
        declareDraw();
        return true;
    }

    return false;
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Win`;
    isPauseGame = true;

    winningIndices.forEach((index) =>
        cells[index].style.background = '#202430'
    )
    restartBtn.style.visibility = 'visible';
}

function declareDraw() {
    titleHeader.textContent = 'Draw';
    isPauseGame = true;
    restartBtn.style.visibility = 'visible';
    
}

restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden';
    inputCells.fill('')
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.background = '';
    })
    isPauseGame = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose';
})

function choosePlayer(selectedPlayer) {
    if(!isGameStart) {
        player = selectedPlayer;
        if(player == 'X') {
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        } else {
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
    }
}