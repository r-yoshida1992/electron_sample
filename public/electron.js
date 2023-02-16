// 各モジュールのインポート
const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

// ブラウザウィンドウに関する処理
const createWindow = () => {
    // ブラウザウィンドウの作成
    mainWindow = new BrowserWindow({
        titleBarStyle: "hidden",
        width: 800,
        height: 600,
        webPreferences: {
            // プリロードスクリプトは、レンダラープロセスが読み込まれる前に実行され、
            // レンダラーのグローバル（window や document など）と Node.js 環境の両方にアクセスできます。
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // URLの読み込み
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"// 開発環境の場合
            : `file://${path.join(__dirname, "../build/index.html")}`// 本番環境の場合
    );

    // メインウィンドウが閉じられたときの処理
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}


// 初期化が完了し、ウィンドウの起動準備ができた時に呼ばれる処理（APIの呼び出しはこの処理の後）
app.whenReady().then(() => {
    createWindow()

    // DjangoをGunicorn経由で起動する処理（※後ほど記述）

    app.on('activate', () => {
        // 開いているウィンドウがなければ開く
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


// ウィンドウが閉じた時の処理（macOSでは明示的にアプリケーションを終了した時）
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

