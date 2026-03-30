# pWebsite SEO / 站长平台上线 SOP

适用站点：`https://www.staychina.org`

目标：把当前多语种官网的技术 SEO、搜索引擎验证、sitemap 提交、初始收录推进、关键词落点和外链执行，全部整理成一份可以直接照着执行的 SOP。

## 0. 快速打勾清单

适合上线当天直接照着勾。

### 0.1 上线前

- [ ] 确认 `lib/company.ts` 中的正式域名正确
- [ ] 确认生产环境全站 HTTPS 正常
- [ ] 确认 `robots.txt` 可访问
- [ ] 确认 `sitemap.xml` 可访问
- [ ] 确认 `manifest.webmanifest` 可访问
- [ ] 确认首页会自动跳转到语言前缀页
- [ ] 确认英文核心页和其他语种页返回 `200`
- [ ] 本地执行 `npm run typecheck`
- [ ] 本地执行 `npm run build`

### 0.2 部署前环境变量

- [ ] 填写 `GOOGLE_SITE_VERIFICATION`
- [ ] 填写 `BING_SITE_VERIFICATION`
- [ ] 如需区域搜索引擎，填写 `BAIDU_SITE_VERIFICATION`
- [ ] 如需区域搜索引擎，填写 `YANDEX_SITE_VERIFICATION`
- [ ] 如需区域搜索引擎，填写 `NAVER_SITE_VERIFICATION`
- [ ] 如需区域搜索引擎，填写 `YAHOO_SITE_VERIFICATION`
- [ ] 完成后重新部署生产环境

### 0.3 上线当天

- [ ] 在 Google Search Console 添加站点并完成验证
- [ ] 在 Bing Webmaster Tools 添加站点并完成验证
- [ ] 如需要，在 Baidu / Yandex / Naver / Yahoo 完成验证
- [ ] 提交 `https://www.staychina.org/sitemap.xml`
- [ ] 请求收录 `/en`
- [ ] 请求收录 `/en/products`
- [ ] 请求收录 `/en/sourcing-service`
- [ ] 请求收录 `/en/products/industrial-computers`
- [ ] 请求收录 `/en/contact`
- [ ] 检查页面存在 `canonical`
- [ ] 检查页面存在 `hreflang`
- [ ] 检查页面存在 `og:image`
- [ ] 检查页面存在 `twitter:image`
- [ ] 检查分享图 URL 可直接访问
- [ ] 确认没有 `noindex`
- [ ] 确认没有错误 404 或错误重定向

### 0.4 上线后 7 天

- [ ] 检查 Search Console 是否已发现 sitemap
- [ ] 检查 Bing 是否已读取 sitemap
- [ ] 检查是否开始出现 impressions
- [ ] 检查是否出现抓取错误
- [ ] 完成第一批品牌外链
- [ ] 完成第一批目录型外链

### 0.5 上线后 30 天

- [ ] 每周复盘索引量变化
- [ ] 每周复盘 impressions 变化
- [ ] 每周检查非品牌词点击
- [ ] 每周检查 `Duplicate without user-selected canonical`
- [ ] 每周检查是否出现异常软 404
- [ ] 每周新增 1 篇可外链内容或资源页
- [ ] 复盘哪个页面表现最好，决定下个月重点优化页

## 1. 当前站点已具备的 SEO 基础

- 多语种路由：`/zh-cn`、`/zh-tw`、`/en`、`/ja`、`/ru`、`/es`、`/pt`
- 自动语言检测 + 手工语言切换
- `canonical` 与 `hreflang`
- `robots.txt`
- `sitemap.xml`
- `manifest.webmanifest`
- 结构化数据：
  - `Organization`
  - `WebSite`
  - `WebPage`
  - `BreadcrumbList`
  - `Service`
  - `ItemList`
  - `FAQPage`
- 动态社交分享图：`/api/social-image/[locale]/[[...slug]]`
- Open Graph / Twitter 分享卡片
- 各语种页面关键词已按路由细分

## 2. 上线前技术检查

上线前先逐项确认：

1. `lib/company.ts` 里的 `website` 已经是正式生产域名
2. 生产环境 HTTPS 正常
3. 以下地址可访问：
   - `https://www.staychina.org/robots.txt`
   - `https://www.staychina.org/sitemap.xml`
   - `https://www.staychina.org/manifest.webmanifest`
4. 首页会跳转到语言前缀页
5. 各语种核心页面都返回 `200`
6. 本地检查通过：
   - `npm run typecheck`
   - `npm run build`

## 3. 站长平台验证码接入

项目已经支持通过环境变量自动输出站长平台验证码，不需要手写 `<meta>`。

### 3.1 支持的环境变量

- Google：`GOOGLE_SITE_VERIFICATION`
- Bing：`BING_SITE_VERIFICATION`
- Baidu：`BAIDU_SITE_VERIFICATION`
- Yandex：`YANDEX_SITE_VERIFICATION`
- Naver：`NAVER_SITE_VERIFICATION`
- Yahoo：`YAHOO_SITE_VERIFICATION`

也兼容对应的 `NEXT_PUBLIC_*` 变量，但优先建议使用服务端变量。

### 3.2 本地或部署平台配置方式

参考根目录：`.env.example`

本地可在 `.env.local` 填写：

```bash
GOOGLE_SITE_VERIFICATION=your_google_token
BING_SITE_VERIFICATION=your_bing_token
BAIDU_SITE_VERIFICATION=your_baidu_token
YANDEX_SITE_VERIFICATION=your_yandex_token
NAVER_SITE_VERIFICATION=your_naver_token
YAHOO_SITE_VERIFICATION=your_yahoo_token
```

部署平台填入同名环境变量后，重新部署即可。

## 4. 各站长平台接入步骤

### 4.1 Google Search Console

1. 添加站点
2. 优先选 `Domain` 资源；如果你更想快速接入，也可以选 `URL Prefix`
3. 若选 HTML tag 验证，复制 `content` 内的 token
4. 配置 `GOOGLE_SITE_VERIFICATION`
5. 重新部署
6. 验证通过后提交：
   - `https://www.staychina.org/sitemap.xml`

### 4.2 Bing Webmaster Tools

1. 添加站点
2. 选择 Meta tag 验证
3. 复制 token
4. 配置 `BING_SITE_VERIFICATION`
5. 重新部署
6. 提交 sitemap

### 4.3 Baidu / Yandex / Naver / Yahoo

流程一致：

1. 添加站点
2. 选择 HTML Meta 验证
3. 复制 token
4. 配置对应环境变量
5. 重新部署
6. 完成验证并提交 sitemap

## 5. 上线当天执行清单

### 5.1 必做

1. 提交 `sitemap.xml`
2. 先请求收录英文核心页：
   - `/en`
   - `/en/products`
   - `/en/sourcing-service`
   - `/en/products/industrial-computers`
   - `/en/contact`
3. 检查是否有以下问题：
   - 被 `robots.txt` 阻止
   - 被 `noindex` 阻止
   - 被错误跳转
   - 返回 `404`
   - canonical 指错

### 5.2 建议同步检查

- 分享图 URL 能打开
- 页面 `<head>` 中存在：
  - `canonical`
  - `hreflang`
  - `og:image`
  - `twitter:image`
- 站长平台能成功抓取主页和服务页

## 6. 当前 `robots.txt` 策略

当前站点的抓取策略是：

- 允许抓取所有正式页面
- 允许抓取 `/api/social-image/`
- 限制抓取其他 `/api/` 路由

这么做的目的是：

- 保留社交分享图可访问性
- 减少搜索引擎对低价值接口的抓取浪费
- 把抓取预算优先用在页面内容上

## 7. 当前页面关键词地图

### 7.1 主关键词落点

| 页面 | 主关键词 | 辅助长尾词 |
| --- | --- | --- |
| `/en` | China sourcing agent | china sourcing company for SMEs, china export service partner |
| `/en/products` | industrial computer supplier China | embedded systems sourcing China, 3C export supplier China |
| `/en/products/3c-export` | 3C electronics export service China | consumer electronics sourcing China, accessories export documentation |
| `/en/products/industrial-computers` | industrial PC supplier China | fanless ipc sourcing, panel pc procurement China |
| `/en/sourcing-service` | supplier verification service China | china supplier due diligence, china procurement support |
| `/en/visa-relocation` | china visa consulting service | china relocation support for foreign professionals |
| `/en/recruitment-service` | recruitment service in China | foreign talent hiring China, bilingual hiring support China |
| `/en/contact` | contact china sourcing agent | china export inquiry, zhuhai sourcing company contact |

### 7.2 使用原则

- 先用英文页承接国际搜索引擎主索引
- 其他语言版本依赖 `hreflang` 建立映射
- 标题和描述不要频繁改
- 不要让多个 URL 竞争同一关键词主题

## 8. 外链执行 SOP

### 8.1 第 1 阶段：自有资产链接（第 1-3 天）

- 公司 LinkedIn 页面补官网链接
- 创始人 / 管理者 LinkedIn 简介补官网链接
- 公司 YouTube / X / Medium / Substack 如有则补官网链接

### 8.2 第 2 阶段：信任型目录（第 1-2 周）

- 商会目录
- 行业协会目录
- 真实资料的 B2B 企业目录
- 校友 / 社群 / 跨境合作伙伴资源页

### 8.3 第 3 阶段：内容型外链（第 2-4 周）

每周发 1 篇专业内容，并向行业媒体或合作方资源页投递。

建议主题：

- China Supplier Verification Checklist for SME Importers
- 3C Export Documentation Checklist
- How to Reduce BOM Drift in Industrial PC Sourcing

### 8.4 锚文本比例

- 60% 品牌词：
  - `Pomerol International`
  - `Pomerol International Trading (Zhuhai) Co., Ltd`
- 30% 半匹配业务词：
  - `China sourcing service`
  - `industrial computer supplier China`
- 10% 通用词：
  - `website`
  - `learn more`
  - `service details`

## 9. 上线后 30 天跟踪指标

每周至少复盘一次：

1. 已收录页面数量是否增加
2. Google / Bing impressions 是否上涨
3. 是否开始出现非品牌词点击
4. 各语种页面是否被正确识别
5. 是否出现 `Duplicate without user-selected canonical`
6. 是否出现异常大量软 404 或重定向问题
7. 外链来源域名是否稳步增加

## 10. 不要做的事情

- 不要买垃圾外链
- 不要用 PBN
- 不要堆砌关键词
- 不要批量生成薄内容页面
- 不要上线后连续几天频繁改标题和描述
- 不要让多个页面争抢同一主题

## 11. 实际执行顺序

如果你按最省事的方式推进，就按下面顺序做：

1. 部署生产环境
2. 填站长平台验证码环境变量
3. 重新部署
4. 提交 `sitemap.xml`
5. 请求收录英文核心页
6. 检查 `robots` / `canonical` / `hreflang` / 分享图
7. 做第一批品牌外链
8. 连续 4 周跟踪 impressions 和索引量

## 12. 仓库内对应文件

- 验证码输出：`lib/seo.ts`
- 全站 metadata：`app/layout.tsx`
- 页面 metadata：`app/[locale]/[[...slug]]/page.tsx`
- 抓取规则：`app/robots.ts`
- 站点地图：`app/sitemap.ts`
- 分享图：`app/api/social-image/[locale]/[[...slug]]/route.tsx`
- 环境变量模板：`.env.example`
