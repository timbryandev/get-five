const cleanseGuessString = (guess: string): string =>
  guess.replace(/[^a-zA-Z]/g, '').slice(0, 5).toLowerCase()

export default cleanseGuessString
