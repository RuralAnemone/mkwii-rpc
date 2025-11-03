# MKWii Discord RPC

heavily inspired by [dotcomboom's rich presence utility](https://github.com/dotcomboom/mkwii-presence)

## *planned* features:

- optional `mkw-ana` enhancements (ENSURE PLATFORM INDIFFERENCE) i.e. showing your Mii, smaller ratelimit maybe idk I think discord rpc is still ratelimited at 0.2Hz
- basically just going off dotcomboom for now

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

- clone the repo
- install deps

```sh
npm i
```

- run index.mjs

```sh
node index.mjs
```

or just run the start script if you have muscle memory

```sh
npm start
```