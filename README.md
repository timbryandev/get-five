# get-five

Guess the 5 letter word with a mastermind codebreaking style game play with no play restrictions - my wife loves the game this is based on but hates having to wait for the next word to be released.

Production build can be played over at https://get-five.timbryan.dev

Things I'd like it to do:

- [x] Use an API to give us as many random, varied words as possible
- [ ] Hint button to reveal first letter
- [ ] Attempt history as a graph showing averages of how many guesses were needed to get a correct answer
- [ ] Add timer for current game
- [ ] Save best time and display as "Record:"
- [ ] 4 and 6 letter modes
- [ ] Map difficulty against best times and display respective time to current difficulty
- [ ] More fun, mobile-optimised styling

## prerequisites

- node@14
- npm@6

## installation

```bash
npm install
```

## dev

```bash
npm run dev   # start local development environment
npm run lint  # lint TypeScript and JavaScript files
```

## deploy

```bash
npm run build # build production assets
npm run start # run production server
```
