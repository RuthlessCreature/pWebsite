# Google SEO 上线 SOP（Pomerol 官网）

## 目标

在网站上线后尽快完成 Google 抓取、收录与初步关键词曝光，避免因为配置缺失导致“可访问但不被索引”。

---

## 1) 上线前技术检查（必须）

1. 确认生产域名与代码一致：`lib/company.ts` 中 `website` 必须是正式域名。
2. 确认可访问：
   - `https://你的域名/robots.txt`
   - `https://你的域名/sitemap.xml`
3. 本地构建通过：
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
4. 确保站点全站 HTTPS 可访问（不要让 http 和 https 混乱）。

---

## 2) 获取 Google Site Verification（你问的重点）

你有两种方式：

### 方式 A（推荐给你当前代码）：URL-prefix + HTML tag（会得到 token）

1. 打开 Google Search Console：`https://search.google.com/search-console`
2. 选择 **添加资源**（Add property）
3. 选择 **URL prefix**（例如 `https://www.pomerol-intl.com/`）
4. 在验证方式里选择 **HTML tag**
5. 你会看到类似：

```html
<meta name="google-site-verification" content="abc123xxxx" />
```

6. 复制 `content` 的值（例如 `abc123xxxx`），这就是你要填的 token。

> 注意：在 Next.js 里只填 token 本身，不要把整段 `<meta ...>` 贴进去。

### 方式 B：Domain + DNS TXT（不需要 token）

1. Search Console 里选 **Domain**
2. 按提示给 DNS 加 TXT 记录
3. 生效后直接验证

> 这种方式更稳，但它不会给你 HTML meta token。  
> 你当前项目已支持 token 注入，所以方式 A 最直接。

---

## 3) 配置环境变量

项目已支持两种变量名（任意一种即可）：

- `GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

推荐优先使用服务端变量：`GOOGLE_SITE_VERIFICATION`。

### 本地开发

在项目根目录创建/修改 `.env.local`：

```bash
GOOGLE_SITE_VERIFICATION=abc123xxxx
```

### 部署平台（Vercel/Netlify/服务器）

在平台环境变量设置里新增同名变量并重新部署。

---

## 4) 验证是否生效

部署后打开页面源码，确认 `<head>` 中出现：

```html
<meta name="google-site-verification" content="abc123xxxx">
```

然后回 Search Console 点击 **Verify**。

---

## 5) 上线当天必须做的收录动作

1. 在 Search Console 提交 Sitemap：  
   `https://你的域名/sitemap.xml`
2. 用 URL Inspection 请求收录：
   - `/`
   - `/products`
   - `/sourcing-service`
   - `/products/industrial-computers`
   - `/contact`
3. 检查 Coverage 是否有 `Blocked by robots.txt`、`noindex`、`404`。

---

## 6) 外链执行 SOP（前 30 天）

### 第 1 周（自有资产）

- 公司 LinkedIn 页面放官网链接
- 负责人 LinkedIn 简介放官网链接
- 其他自有渠道（如 YouTube/X/Medium）补齐官网链接

### 第 2 周（行业与信任目录）

- 商会/行业协会目录
- 相关 B2B 企业目录（真实资料，不灌水）
- 合作伙伴官网资源页互链

### 第 3-4 周（内容驱动外链）

- 每周 1 篇专业文章（供应商审核、出口单证、工控选型）
- 向行业博客/newsletter 投稿或交换引用
- 锚文本比例控制：品牌词为主，部分业务词，少量通用词

---

## 7) 每周复盘指标（Google 视角）

1. 已索引页面数量是否上升
2. 展示量（Impressions）是否周环比增长
3. 非品牌词是否开始出现点击
4. 外链域名数是否稳定增加（重质量，不追垃圾数量）

---

## 8) 常见错误避免

- 不要购买垃圾外链/PBN
- 不要堆砌关键词
- 不要频繁改标题和描述（建议 2-3 周观察一个版本）
- 不要让多个 URL 版本竞争同一页面（canonical 要一致）
