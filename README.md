# get-five

Guess the 5 letter word with a mastermind codebreaking style game play with no play restrictions - my wife loves the game this is based on but hates having to wait for the next word to be released.

Production build can be played over at [https://get-five.timbryan.dev](https://get-five.timbryan.dev)

If you'd like to report a bug or request a new feature, please start a `New issue` here: [https://github.com/timbryandev/get-five/issues](https://github.com/timbryandev/get-five/issues)

Things I'd like it to do: moved to the project's [issues board](https://github.com/timbryandev/get-five/issues)

## Prerequisites

- node@14
- npm@6

## Installation

```bash
# Clone the repo
git clone https://github.com/timbryandev/get-five.git

# Change directory to cloned repo folder
cd get-five

# Install javascript dependencies
npm install
```

## Development

```bash
# Start local development environment
npm run dev

# Lint TypeScript and JavaScript files
npm run lint

# Testing
npm run test       # run tests as a one-off task, usually for CI/CD tasks
npm run test:watch # run tests in watch mode to aid TDD of utils et al
```

## Deploy

```bash
# Build production assets
npm run build

# Run production server
npm run start
```

## Misc scripts

```bash
# Build js dictionaries from `/scripts/generate-word-lists/words.js` into `/configs/words-[word length].js`
npm run generate-words
```
