# MKWii Discord RPC

## how this works

<details><summary>Wiimmfi's MKWii status page has auto-reload with a bunch of useful stats</summary>
<video controls title="Wiimmfi's auto-reload functionality" src="https://codeberg.org/RuralAnemone/mkwii-rpc/raw/branch/main/assets/wiimmfi-auto-reload-example.mp4"></video>
</details>

this script <!--does--> will do <!--don't convert the rest to infinitive or future perfect or whatever bro it's fine--> the following:

- uses some relative bloatware[^bloatware] for friendcode/pid input
  - if you input a friendcode, find related pid on `wiimmfi.de/stats/mkw`[^scraper]
  - if you input a pid, just use that
  - otherwise yell at the user a little bit
- open `wiimmfi.de/stats/mkw/room/p{pid}`[^scraper] and parse room and player details into a (configurable?) discord rich presence[^rpc]

<!-- <details><summary>see it in action</summary>
![usage](./assets/usage.mp4)
</details> -->

[^bloatware]: [npm/blessed](https://www.npmjs.com/package/blessed)
[^scraper]: [npm/puppeteer](https://www.npmjs.com/package/puppeteer) — yeah I know it uses chrome, deal with it ![mlg](./assets/mlg.png). also you're clearly using discord so uhh
[^rpc]: [npm/discord-rich-presence](https://www.npmjs.com/package/discord-rich-presence)

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