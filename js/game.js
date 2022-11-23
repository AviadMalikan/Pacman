'use strict'

const WALL = '&#9746'
// const WALL = '&#9778'
const FOOD = '•'
const EMPTY = ' '
const SUPER_FOOD = '🍔'
const CHERRY = '🍒'

var gGame
var gBoard

function onInit() {
    restartGame()
    console.log('Lets PLAY!')
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []
    var foodCounter = 0
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 4 && i > 3 && i < size - 2)) {
                board[i][j] = WALL
            }
            if (board[i][j] === FOOD) foodCounter++
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD

    // console.log('foodCounter: ', foodCounter)
    var updateFood = foodCounter - 5
    gGame.foodOnBoard = updateFood

    return board
}

function updateScore(diff) {
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    var winOrLoseMsg
    var winOrLoseSymbol

    if (gGame.isWin) {
        winOrLoseMsg = 'YOU WIN 😁'
        winOrLoseSymbol = PACMAN
    } else {
        winOrLoseMsg = 'YOU LOSE 😭'
        winOrLoseSymbol = DEAD_PACMAN
        playLoseSound()
    }

    console.log('Game Over')
    setTimeout(() => alert(`${winOrLoseMsg}`), 100)
    openRestartModal(winOrLoseMsg)

    clearInterval(gGame.cherryInterval)
    clearInterval(gIntervalGhosts)

    gGame.isOn = false
    renderCell(gPacman.location, winOrLoseSymbol)
}

function addCherry() {
    var cell = getEmptyCell()
    if (!cell) return

    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
}

function restartGame() {
    var elContainer = document.querySelector('.play-again-container')
    elContainer.classList.add('hide')
    document.querySelector('h2 span').innerText = 0
    resetValue()
}

function resetValue() {
    gGhosts = []
    gDeadGhosts = []
    gGame = {
        score: 0,
        isOn: true,
        isWin: false,
        foodOnBoard: 0,
        cherryInterval: setInterval(addCherry, 15000)
    }
}

function openRestartModal(msg) {
    var elContainer = document.querySelector('.play-again-container')
    elContainer.classList.remove('hide')
    elContainer.innerHTML = `<h3>This time ${msg}, Want To play again?</h3> <br>
    <button onclick="onInit()">Click here</button>`
}
