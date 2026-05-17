# DViewer 产品介绍站（静态）

**LuXOne DViewer** 的中文单页介绍站点。本目录位于工作区根目录 **`dviewer-website/`**，与 **`DViewer/`** 应用 crate 分离，便于单独建 GitHub 仓库或开通 GitHub Pages。

无需构建，直接部署静态文件即可。

## 下载地址

`index.html` 中导航栏与主按钮的「下载」链接指向飞书文件分发页。若更换发布位置，请同时修改两处 `href`（保持 URL 一致）。

## 语言

页面右上角 **中文 / EN** 切换界面语言；默认 **中文**。选择会写入浏览器 `localStorage`（键名 `dviewer-site-lang`），下次访问会记住。

文案与逻辑在 **`site.js`** 的 `I18N` 对象中维护。

## Logo

`assets/logo.png` 来自主仓库 `PatientManager/resources/logos/raw/icon.png` 的副本。若有正式品牌物料，可替换该文件。

## 本地预览

```bash
cd dviewer-website
python -m http.server 8080
```

浏览器打开 `http://localhost:8080`。

## 发布到 GitHub（[luhaibo/dviwerpage](https://github.com/luhaibo/dviwerpage)）

本机已登录 GitHub（HTTPS 或 SSH）后，在 **`dviewer-website`** 目录执行：

```powershell
.\publish-github.ps1
```

脚本会：临时克隆远端 → 用当前目录文件覆盖（保留 `.git`）→ `git add -A` → `commit`（有变更时）→ `push`。

若 Cursor/沙箱环境无法访问 `github.com:443`，请在 **本机 PowerShell** 中运行上述脚本完成上传。

## 部署到 GitHub Pages（独立仓库）

1. 在 GitHub 新建空仓库（例如 `dviewer-website`）。
2. 将本目录下 **`index.html`、`styles.css`、`assets/`、本 README`** 拷到该仓库根目录并推送。
3. 仓库 **Settings → Pages** 中，选择从分支发布（常见为 `main` 根目录）。

## 其他静态托管

将 **`dviewer-website/`** 整目录（含 `assets/`）上传到 Nginx、对象存储静态网站、Cloudflare Pages 等即可。

## 与主仓库 `rust-cbct` 的关系

应用程序与详细文档仍在主仓库的 **`DViewer/`** 目录；本站仅作产品展示与下载入口，不随应用一起编译。
