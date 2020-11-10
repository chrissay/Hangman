import Hangman from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.querySelector('#puzzle')
const badGuessEl = document.querySelector('#guessed')
const guessesEl = document.querySelector('#guesses')
let game1

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    const guessCode = e.charCode

    if (guessCode > 96 && guessCode < 123) {
        game1.makeGuess(guess)
        render()
    } else {
        return
    }
})

const render = () => {
    puzzleEl.innerHTML = ''
    badGuessEl.textContent = game1.wrongGuess
    guessesEl.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()
