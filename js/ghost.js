'use strict'

const GHOST = '👻'
var gGhosts = []
var gDeadGhosts = []

var gIntervalGhosts


function createGhosts(board) {
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts,  gDifficult)
}

function createGhost(board) {
    const ghost = {
        color: getRandomColor(),
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SUPER_FOOD) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function killGhost(pos) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost.location.i === pos.i && ghost.location.j === pos.j) {
            gDeadGhosts.push(ghost)
            gGhosts.splice(i, 1)

            if (ghost.currCellContent === FOOD) {
                ghost.currCellContent = ' '
                gPacman.eatFood++
                updateScore(1)
            }
        }
    }
    setTimeout(addDeadGhosts, 5000)
}

function addDeadGhosts() {
    for (var i = 0; i < gDeadGhosts.length; i++) {
        var ghost = gDeadGhosts[i]
        gGhosts.push(ghost)
        gDeadGhosts.splice(i, 1)
    }
}

function getMoveDiff() {
    const randNum = getRandomInt(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var color = gPacman.isSuper ? 'red' : ghost.color
    return `<span style="background-color:${color}; ">${GHOST}</span>`
}

function renderGhosts(){
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}
