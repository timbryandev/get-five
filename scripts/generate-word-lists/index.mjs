import { exec } from 'child_process'
import fs from 'fs'

import { allWords } from './words.js'

function writeToFile ([key, value]) {
  const fileName = `./config/words-${key}.js`
  const contents = `const words =\n  ${JSON.stringify(
    value
  )}\n\nexport default words\n`

  console.log(`creating ${fileName}`)

  fs.writeFile(fileName, contents, err => {
    if (err) return console.log(err)
    console.log(`linting  ${fileName}`)
    exec(`eslint ${fileName} --fix`, () => console.log(`finished ${fileName}`))
  })
}

const { four, five, six } = allWords
  .sort((a, b) => a > b)
  .reduce(
    function createGroupsByWordLength (acc, cur) {
      switch (cur.length) {
        case 4:
          return { ...acc, four: [...acc.four, cur] }
        case 5:
          return { ...acc, five: [...acc.five, cur] }
        case 6:
          return { ...acc, six: [...acc.six, cur] }
      }
      return acc
    },
    { four: [], five: [], six: [] }
  )

Object.entries({ four, five, six }).forEach(writeToFile)
