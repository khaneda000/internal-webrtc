# internai-webrtc

> An electron-vue project, created by simulatedgreg/electron-vue
> % vue init simulatedgreg/electron-vue InternalWebRTC

#### Build Setup

``` bash
# install dependencies
npm install / yarn

# serve with hot reload at localhost:9080
npm run dev / yarn run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

##### UI

> Element-UI

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


#### issues

- npm run buildでエラー
    - 作り直してみる

```
    ERROR in unknown: Unexpected token (14946:4)
    Child html-webpack-plugin for "index.html":
             Asset     Size  Chunks  Chunk Names
        index.html  556 KiB       0
        Entrypoint undefined = index.html
        [0] ./node_modules/html-webpack-plugin/lib/loader.js!./src/index.ejs 1.28 KiB {0} [built]
        [1] ./node_modules/lodash/lodash.js 527 KiB {0} [built]
        [2] (webpack)/buildin/module.js 497 bytes {0} [built]
```

