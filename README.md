# Confrerre

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

- [x] selfをアロー演算子にしてなくす
- [x] 退出時にカメラを外す
- [x] ランダムなIDで入室
- [x] 画質制限
- 入室設定
    - [ ] カメラ利用するかどうかを聞く
    - [ ] 画質
- [ ] ルームの入室人数を表示
- [ ] チャット着信時の通知と効果音
- [ ] 入室退出を表示
- [ ] 画面共有


#### ハマった

- screen share 一旦無理っぽい

```
      this.screenShare = window.ScreenShare.create({debug: true})
      console.log('enable screenshare', this.screenShare.isScreenShareAvailable())

      this.screenshare.start({
        width: 600,
        height: 400,
        frameRate: 24
      }).then(function (stream) {
        console.log('success screen share')
      }).catch(function (error) {
        console.log('error screen share', error)
      })

```

- npm run buildでエラー
    - scriptでtsを指定しているのが原因だった

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

- ビルド後にレイアウトがおかしいし、ローディング後に何も出ない
    - prodでローカルでビルドしてみる
        - process.env.NODE_ENV = 'production'を入れてみる
        - 普通に動いた
    - warningを一通り消す
        - ダメ
    - index.dev.jsのdebug系の表示系をいろいろindex.jsに入れてみる
        - production時のindex.ejsでのcss読み込みがおかしかった