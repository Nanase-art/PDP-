# PDP 動物性格測驗

以原生 HTML、CSS 與 JavaScript 製作的響應式單頁心理測驗，不需要安裝套件或建置指令。

## 本機預覽

直接用瀏覽器開啟 `index.html` 即可預覽。測驗包含 8 道題目、進度條、答題星星動畫、四種動物結果、返回上一題、重測與分享功能。

## 發佈到 GitHub 與 Vercel

1. 在 GitHub 建立一個新的 repository，將本資料夾中的檔案上傳至 repository 根目錄。
2. 登入 Vercel，選擇 **Add New → Project**，匯入剛建立的 GitHub repository。
3. Framework Preset 選 **Other**；Build Command 留空，Output Directory 設為 `.`。
4. 按 **Deploy**。之後推送到 GitHub 的更新會由 Vercel 自動重新部署。

網站入口是根目錄的 `index.html`，不需要環境變數。分享按鈕會使用裝置原生分享功能；若瀏覽器不支援，則複製分享文字與網址。
