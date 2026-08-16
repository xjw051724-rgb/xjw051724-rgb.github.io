# 熊家卫｜游戏活动运营作品集

这是一个基于 React、Vite 与 Tailwind CSS 的个人作品集网站。压缩包已包含页面源码、图片、二维码、背景音乐和项目数据，换一台电脑后可以继续由 Codex 或开发者修改。

## 本地预览

建议使用 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

终端会显示本地预览地址，通常为 `http://127.0.0.1:5173/`。

## 生产构建与部署

```bash
npm run build
```

构建完成后的静态文件位于 `dist/`，可部署到 Cloudflare Pages、Vercel、Netlify 或任意静态网站服务器。

- 构建命令：`npm run build`
- 发布目录：`dist`
- Node.js：20+

## 内容修改入口

- 首页、项目卡片、详情页文案与数据：`src/data/portfolio.ts`
- 首页与卡片等组件：`src/components/`
- 页面样式与响应式规则：`src/styles/index.css`
- 图片、二维码与背景音乐：`public/assets/`、`public/images/`

背景音乐默认关闭，文件位于 `public/assets/portfolio-ambient.mp4`；用户点击右上角音符后以 0.8 倍速、低音量循环播放。

## 打包说明

为减小体积，压缩包不包含可重新生成的 `node_modules/`、`dist/` 与 Git 历史。解压后执行 `npm install` 即可恢复开发环境。

Windows 的 Codex、WorkBuddy 和部署操作，请查看 [Windows-Deployment-Guide.md](./Windows-Deployment-Guide.md)。
