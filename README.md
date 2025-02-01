# Nuxt.js 3 NASA app

This is a show case of the latest version of Nuxt. If you just want to see it in action quickly it is hosted here: [On my Netlify](https://nasa-nuxt-pinia.netlify.app/).

## Setup locally

- Add .env file at the route and add this content:
```
NUXT_API_KEY=<your own api key>
NUXT_PUBLIC_BASE_URL=https://api.nasa.gov/
```
- You can get your api key and find the Docs for NASA' public API [here](https://api.nasa.gov)
- Then install node modules `npm install`.
- To run locally `npm run dev`.

## I have left in other commands and link to the Nuxt docs.

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
