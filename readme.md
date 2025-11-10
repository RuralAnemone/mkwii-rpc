# MKWii Discord RPC

heavily inspired by [dotcomboom's rich presence utility](https://github.com/dotcomboom/mkwii-presence)

initial RPC script scaffolding from https://github.com/ThunderDoesDev/Custom-RPC

## *planned* features:

- [ ] optional `mkw-ana` enhancements (ENSURE PLATFORM INDIFFERENCE) i.e. showing your Mii, smaller ratelimit maybe idk I think discord rpc is still ratelimited at 0.2Hz

- [ ] GUI

- [ ] custom layouts (see `states.json`)

## how this works

<details><summary>Wiimmfi's MKWii status page has auto-reload with a bunch of useful stats</summary>
<video controls title="Wiimmfi's auto-reload functionality" src="https://codeberg.org/RuralAnemone/mkwii-rpc/raw/branch/main/assets/wiimmfi-auto-reload-example.mp4"></video>
</details>

therefore this script doesn't abuse the service.

this script <!--does--> will do <!--don't convert the rest to infinitive or future perfect or whatever bro it's fine--> the following:

- open `wiimmfi.de/stats/mkw/room/p{pid}`[^scraper] and parse room and player details into a (configurable?) discord rich presence[^rpc]
- if you configure `mkw-ana`, use that to glean extra useful and configurable details

<!-- <details><summary>see it in action</summary>
![usage](./assets/usage.mp4)
</details> -->

[^scraper]: [npm/puppeteer](https://www.npmjs.com/package/puppeteer) — yeah I know it uses chrome, deal with it ![mlg](./assets/mlg.png). also you're clearly using discord so uhh
[^rpc]: [npm/discord-rpc](https://www.npmjs.com/package/discord-rpc)

## how to use

1. clone the repo

2. install deps

```sh
npm i
```

3. configure environment variables
  - copy `.env.example` to `.env` and fill out the values.
    - see the file comments if you need help


4. run index.mjs

```sh
node index.mjs
```

or just run the start script if you have muscle memory

```sh
npm start
```

## using your own client

1. set `CLIENT_ID` in `.env`
2. download [`assets/export.tar.gz`](https://codeberg.org/RuralAnemone/mkwii-rpc/raw/branch/main/assets/export.tar.gz). upload everything into ( Discord Developers > Rich Presence > Art Assets ) — you may get ratelimited, so try uploading a couple files at a time
3. set your imgur api key wherever once I implement miis in mkw-ana

---

###### *this program was brought to you by the human brain. no LLMs were used in the making of this program*