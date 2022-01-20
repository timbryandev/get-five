# get-five

Clone of Wordle, with no restrictions as my wife loves this game and hates waiting for the next round.

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
npm run dev   # start dev env
npm run lint  # lint files
```

## deploy

```bash
npm run build # build production assets
npm run start # run production server
```

## credits

Base game from [https://alexkates.hashnode.dev](https://alexkates.hashnode.dev/how-i-built-a-wordle-clone-using-nextjs-tailwindcss-and-typescript)
