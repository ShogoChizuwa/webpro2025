// node.jsの標準ライブラリであるhttpとurlをインポートする
// "node:" をつけることで、Node.jsコアモジュールであることを明示しているのじゃ
import http from 'node:http';
import { URL } from 'node:url';

// 環境変数 `PORT` が設定されていればその値を、なければ8888番ポートを使う
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // リクエストのURLをパースして、パス名やクエリパラメータを取得しやすくする
  // 'http://' + req.headers.host は、URLの形式を整えるためのおまじないじゃ
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = requestUrl.pathname;
  const query = requestUrl.searchParams;

  // レスポンスのヘッダーに、文字コードがUTF-8のHTMLであることを設定する
  // これをしないと、日本語が文字化けしてしまうことがあるんじゃ
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // パス名で処理を分岐する
  if (path === '/') {
    console.log("ルートパス (/) へのアクセスがありました。");
    // ステータスコード200 (成功) を設定し、レスポンスを返す
    res.writeHead(200);
    res.end('こんにちは！');
  } else if (path === '/ask') {
    console.log("/ask へのアクセスがありました。");
    // クエリパラメータ 'q' を取得する
    const question = query.get('q');
    // ステータスコード200 (成功) を設定し、質問内容を含んだレスポンスを返す
    res.writeHead(200);
    res.end(`Your question is '${question}'`);
  } else {
    console.log("未定義のパスへのアクセスがありました。");
    // ステータスコード404 (Not Found) を設定し、エラーメッセージを返す
    res.writeHead(404);
    res.end('ページが見つかりません');
  }
});

// 指定したポートでサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました: http://localhost:${PORT}`);
});