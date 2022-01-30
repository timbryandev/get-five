# get-five

Guess the 5 letter word with a mastermind codebreaking style game play with no play restrictions - my wife loves the game this is based on but hates having to wait for the next word to be released.

Can currently be played over at https://get-five-timbryandev.vercel.app/

Things I'd like it to do that the original doesn't:

- [x] No daily play limit - use an API to give us as many random words as we like
- [ ] Add timer for current game
- [ ] Save best time and display as "Record:"
- [ ] Increase/decrease difficulty by increasing/decreasing word length
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

## credits

Base game from [https://alexkates.hashnode.dev](https://alexkates.hashnode.dev/how-i-built-a-wordle-clone-using-nextjs-tailwindcss-and-typescript)
