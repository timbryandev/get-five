const cleanseGuessString = (guess: string, max: number): string =>
  guess.replace(/[^a-zA-Z]/g, '').slice(0, max).toLowerCase()

export default cleanseGuessString
