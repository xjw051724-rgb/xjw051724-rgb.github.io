# Windows 部署与继续修改说明

这个压缩包是完整的可编辑 React 项目。Windows 上的 Codex、WorkBuddy、Cursor、VS Code 等工具都可以直接打开解压后的 `xiongjiawei-portfolio` 文件夹。

## 第一次本地预览

1. 安装 Node.js 20 或更高版本：<https://nodejs.org/>
2. 解压项目并用 Codex 或 WorkBuddy 打开 `xiongjiawei-portfolio` 文件夹
3. 在项目终端执行：

```bash
npm install
npm run dev
```

4. 打开终端显示的本地网址，通常是 `http://127.0.0.1:5173/`

## 修改内容

- 文案、项目数据、封面路径：`src/data/portfolio.ts`
- 页面组件：`src/components/`
- 样式与响应式规则：`src/styles/index.css`
- 页面实际使用的图片、二维码、音乐：`public/images/portfolio/` 与 `public/assets/`

## 部署上线

在项目终端执行：

```bash
npm run build
```

成功后会生成 `dist` 文件夹。上传 `dist` 到 Cloudflare Pages、Vercel、Netlify 或任意静态网站托管平台即可。

- Build command：`npm run build`
- Publish directory：`dist`
- Node.js：20+

## 文件体积说明

压缩包只保留当前网站实际使用的素材；未包含 `node_modules`、`dist`、Git 历史及未使用的旧图，因此体积更适合传输。解压后先运行 `npm install`，依赖会自动下载。
