# Fish Kingdom 🐟

Fish Kingdom is a free arcade game for Reddit. You play a small fish in a pond, eat enough prey to grow and evolve, and clear stages to climb a leaderboard in the community where the game is installed. Progress is saved to your Reddit account, and reaching milestones earns you a subreddit flair.

It is built for casual players who want a short, replayable game inside Reddit, and for moderators who want an engaging app for their community.

## What the app does

- **A playable game inside Reddit.** The app creates a post in your subreddit. The post shows the live game, and tapping it opens a full-screen version.
- **Grow and evolve.** Move your fish with a swipe or the arrow keys, eat prey to fill the evolution bar, and avoid predators. Clearing a stage moves you to the next one with a new species and three stars.
- **Community leaderboard.** The top players in the subreddit are listed under the score bar. On desktop you see the top 5; on mobile you see the top 3 plus your own row. Only logged-in Reddit users are ranked.
- **Flair rewards.** Reaching stage 5 earns "Pond Hunter" flair and stage 10 earns "Reef Champion" flair in the subreddit.
- **Share your rank.** A share button in the leaderboard opens Reddit's share sheet with your current rank.
- **Optional support.** A tip jar lets players support the app through Reddit's payments system. It gives no gameplay advantage.
- **Optional notifications.** Players can opt in to push notifications, and turn them off again at any time.

## Who it is for

- **Players** who want a quick, replayable arcade game in their Reddit feed.
- **Moderators** who want to add a game to their community. Installing the app creates a game post automatically.

## How players use it

1. Open the game post in the subreddit.
2. Tap the banner to open the full-screen game.
3. Swipe (mobile) or use the arrow keys (desktop) to move. Eat smaller fish to fill the evolution bar, and avoid larger predators.
4. Clear the stage to advance. Each clear is saved to the server and updates your leaderboard position.
5. Check the leaderboard for your rank, and use the share button to share it.
6. Reach stage 5 or 10 to earn flair in the subreddit.

## How moderators set it up

1. Install the app from its app page and choose the subreddit. The app creates a game post automatically.
2. To create another game post later, use the subreddit moderator menu item **Create a new post**.
3. Turn on **user flair** in the subreddit's mod tools if you want players to receive the flair rewards. Without it, progress still saves, but flair cannot be set.
4. Optionally review the app's terms and conditions in [TERMS.md](./TERMS.md).

## Important operational notes

- **Login required for ranking.** The leaderboard and flair rewards use the player's Reddit account. Logged-out players can play, but their progress is not ranked.
- **Progress is verified on the server.** The game does not trust a stage number sent by the browser. Each stage clear adds one stage on the server, clears that arrive less than 10 seconds apart are rejected, and progress is capped at stage 10,000. A player's older local progress is not backfilled into the leaderboard, so returning players may see a lower leaderboard number than their in-game stage.
- **Leaderboards are per subreddit.** Scores are stored per app installation, so each community has its own board.
- **Flair replaces existing flair.** When the app awards flair, it replaces any flair the player already has in that subreddit. Players can change it again through Reddit at any time.
- **Payments.** The support purchase is processed by Reddit. It is optional and does not unlock gameplay advantages.
- **Notifications.** Push notifications are optional, and only sent to players who opt in. Sending notifications requires approval for Reddit's notifications beta.
- **Data.** The app stores each player's stage, last clear time, and flair tier in Redis, plus a leaderboard of usernames and stages for the subreddit.

## Tech stack

- [Devvit](https://developers.reddit.com/) for the Reddit app runtime, Redis, and Reddit API access
- [React](https://react.dev/) 19 + [Vite](https://vite.dev/) for the client
- [Hono](https://hono.dev/) for server routes
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TypeScript](https://www.typescriptlang.org/) for server and shared code

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

## Local development

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

Apps that sell digital goods or create custom posts need review before they can be published publicly. Terms & conditions must be linked in the app's developer settings before publishing.

## Limitations

- Flair is set with `reddit.setUserFlair`, which replaces any flair the player already has in that subreddit.
- Push notifications require approval for Reddit's notifications beta.
- Payments run in sandbox until the product is approved.
- Server-side verification stops fake stage numbers and rapid-fire submissions, but it cannot detect a scripted player who plays within the time limits. Full protection would require running the game logic on the server.

## Contributing

Issues and pull requests are welcome at https://github.com/Rachasumanth/fish-kingdom.

## License

MIT — see [LICENSE](./LICENSE).
