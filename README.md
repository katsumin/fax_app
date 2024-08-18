# fax_app

app for fax

### 概要

- HylaFAX 用 API[fax_api](https://github.com/katsumin/fax_api)のフロントエンドです。

### 環境

- yarn をインストール済み

```sh
user@raspbx:~/fax_app $ node -v
v18.20.4
user@raspbx:~/fax_app $ yarn -v
1.22.22
user@raspbx:~/fax_app $
```

- 使用ライブラリ
  - [Material UI](https://mui.com/material-ui/getting-started/)
  - [react-tiff](https://www.npmjs.com/package/react-tiff)
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom)
  - [axios](https://axios-http.com/docs/intro)

### 機能

- PDF ファイルをアップロードして、FAX 送信できます。
- 受信した FAX の一覧（HylaFAX に依存しており、一定時間で削除されるようです）と受信イメージのプレビューができます。

### インストール

```sh
yarn
```

### 実行

- 前提
  - ポート 3000 で[fax_api](https://github.com/katsumin/fax_api)が動作していること
- コマンド
  ```sh
  tmux new-session -d 'yarn dev'
  ```
