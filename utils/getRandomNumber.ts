import MersenneTwister from './MersenneTwister.js'

const mt = new MersenneTwister()

const generateRandomIntegerInRange = (min: number, max: number) =>
  Math.floor(mt.random() * (max - min + 1)) + min

export default generateRandomIntegerInRange
