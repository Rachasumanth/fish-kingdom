# Fish Kingdom 🐟

A casual arcade game built for Reddit with [Devvit](https://developers.reddit.com/). You start as a tiny guppy and hunt your way up the food chain, clearing stages to climb a community leaderboard and earn subreddit flair.

- **Play:** the app creates a post in the subreddit. The post banner runs the live game; tapping anywhere opens the full-screen version.
- **Terms & Conditions:** [TERMS.md](./TERMS.md)
- **License:** [MIT](./LICENSE)

## Features

- **Playable in the feed and full screen.** The inline post renders the live game (no static splash image), and a tap anywhere opens the expanded game.
- **Responsive layout.** The pond adapts to any screen size, including phone portrait, phone landscape, and desktop, with safe-area handling for notches and rounded corners.
- **Community leaderboard.** Top 5 on desktop, top 3 plus your own row on mobile. Scores are shown with a diamond icon. On desktop the score bar and leaderboard sit in the top-left corner; on mobile they are centered at the top with the pond below.
- **Server-verified progress.** The client never sends a stage number. Each real stage clear calls `POST /api/stage-cleared`, and the server adds exactly `+1` and records the timestamp. Clears that arrive less than 10 seconds after the previous one are rejected, and progress is capped at stage 10,000.
- **Flair rewards.** Reaching stage 5 awards the "Pond Hunter" flair and stage 10 awards "Reef Champion". Each tier is granted once and stored in Redis. Flair failures are logged and never block progress.
- **Share your rank.** The leaderboard has a share button that opens Reddit's share sheet with your current rank.
- **Support the app.** An optional tip jar uses Reddit's payments platform (`support-app` product), fulfilled by `/internal/payments/fulfill`.
- **Push notifications (opt-in).** Players can opt in or out of push notifications; the toggle is backed by `@devvit/notifications`.
- **Automatic post on install.** Installing the app creates a game post in the subreddit.

## How it works

| Layer | Location | Responsibility |
| --- | --- | --- |
| Game client | `src/client/game/App.jsx` | Canvas rendering, input, HUD, stage transitions |
| Leaderboard UI | `src/client/game/LeaderboardPanel.tsx` | Top players, your row, share action |
| Client hooks | `src/client/game/useLeaderboard.ts` | Fetches the board, reports stage clears, shows reward toasts |
| Inline post | `src/client/splash.tsx` | Renders the live game in the post and opens expanded mode on tap |
| API | `src/server/routes/api.ts` | `/api/leaderboard`, `/api/stage-cleared`, plus the starter counter routes |
| Leaderboard core | `src/server/core/leaderboard.ts` | Redis sorted set, per-user progress, flair awarding |
| Progress rules | `src/shared/progress.ts` | Stage-clear validation, stage cap, flair tiers |
| Payments | `src/server/routes/payments.ts` | Fulfills the support purchase |
| Notifications | `src/server/core/notifications.ts` | Push opt-in state via `@devvit/notifications` |

### Data model

Redis is scoped per app installation, so every subreddit gets its own board.

- `leaderboard:stage` — sorted set of `username -> highest verified stage`
- `progress:{username}` — hash with `stage`, `lastAt` (last accepted clear timestamp), and `flairStage` (highest flair tier awarded)
- `support:count` — number of support purchases

Because the server only counts clears made while logged in, a player's older local progress is not backfilled into the leaderboard.

## Tech stack

- [Devvit](https://developers.reddit.com/) 0.15 for the Reddit app runtime, Redis, and Reddit API access
- [React](https://react.dev/) 19 + [Vite](https://vite.dev/) 8 for the client
- [Hono](https://hono.dev/) for server routes
- [Tailwind CSS](https://tailwindcss.com/) 4 for styling
- [TypeScript](https://www.typescriptlang.org/) for server and shared code
- [lucide-react](https://lucide.dev/) for icons

## Getting started

Requires **Node.js 24** (see `.nvmrc`).

```bash
npm install
npm run login
npm run dev
```

`npm run dev` starts `devvit playtest` against the subreddit in `devvit.json` (`fish_kingdom_dev`). Open the playtest URL it prints, for example:

```
https://www.reddit.com/r/fish_kingdom_dev/?playtest=fish-kingdom
```

Server logs stream in the playtest terminal. You can also stream them separately:

```bash
npx devvit logs fish_kingdom_dev --since=1h
```

Client-side errors do not reach the terminal; check the browser console on the Reddit post.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Build in watch mode and playtest on Reddit |
| `npm run build` | Build the client and server |
| `npm run test:types` | Type-check with `tsc --build` |
| `npm run lint` | Lint TypeScript sources with ESLint |
| `npm run deploy` | Type-check, lint, and upload a new app version |
| `npm run launch` | Deploy and submit the app for review |
| `npm run prettier` | Format the project |

## Deploying

```bash
npx devvit upload          # private build for testing
npx devvit publish         # unlisted publish request
npx devvit publish --public  # public listing (requires review)
```

Apps that sell digital goods or create custom posts need review before they can be published publicly. Terms & Conditions must be linked in the app's developer settings before publishing.

## Notes and limitations

- Flair is set with `reddit.setUserFlair`, which replaces any flair the player already has in that subreddit.
- Push notifications require approval for Reddit's notifications beta.
- Payments run in sandbox until the product is approved.
- Server-side verification stops fake stage numbers and rapid-fire submissions, but it cannot detect a scripted player who plays within the time limits. Full protection would require running the game logic on the server.

## Contributing

Issues and pull requests are welcome at https://github.com/Rachasumanth/fish-kingdom.

## License

MIT — see [LICENSE](./LICENSE).
