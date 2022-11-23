'use strict'

const PACMAN = `<img src="img/pacman.png" class="pacman" alt="pacman">`
const DEAD_PACMAN = `<img src="img/dead-pacman.png" class="pacman" alt="pacman">`
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        eatFood: 0,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        } else {
            killGhost(nextLocation)
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
        gPacman.eatFood++
        if (gPacman.eatFood === gGame.foodOnBoard) {
            gGame.isWin = true
            gameOver()
        }
    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        renderGhosts()
        setTimeout((() => {
            gPacman.isSuper = false
        }), 5000)
    }
    if (nextCell === CHERRY) updateScore(10)


    console.log('gPacman.eatFood: ', gPacman.eatFood)

    // DONE: moving from pos - model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: move to new pos - model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            gPacman.deg = '90deg'
            nextLocation.i--
            break;
        case 'ArrowRight':
            gPacman.deg = '180deg'
            nextLocation.j++
            break;
        case 'ArrowDown':
            gPacman.deg = '-90deg'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gPacman.deg = '0deg'
            nextLocation.j--
            break;
    }
    return nextLocation
}

function getPacmanHTML(deg) {
    return `<div style="transform: rotate(${deg})" >${PACMAN}</div>`
}