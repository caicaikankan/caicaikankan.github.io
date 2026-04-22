# 文章格式规则

为了保持博客文章的一致性和可读性，所有新文章必须遵循以下格式规则：

## 1. 文章结构

### 1.1 标题
- 文章正文开头不再手写一级标题，标题由 frontmatter 的 `articleTitle` 统一渲染
- 二级标题（##）：章节标题
- 三级标题（###）：子章节标题

### 1.2 内容
- 文章内容应分段清晰，每段不超过10行
- 重要概念或观点使用加粗（**内容**）突出
- 代码块使用```包围
- 列表使用 `-` 或 `1.` 标记

### 1.3 元信息
所有文章必须在开头添加 frontmatter，至少包含以下字段：

```yaml
---
articleTitle: 文章标题
author: Yu
publishDate: YYYY-MM-DD
readingTime: X 分钟
lastUpdated: YYYY-MM-DD
cover: /covers/your-article-cover.svg
---
```

其中：
- `publishDate` 为文章发布日期
- `readingTime` 为预计阅读时间（根据文章长度估算）
- `lastUpdated` 为最近更新时间
- `cover` 为文章头图

### 1.4 页首与页尾
- 文章页统一显示为：标题 -> 头图 -> 作者/发布时间/阅读时间
- 文章结尾信息由主题自动渲染为：作者 / 发布时间 / 最近更新
- 不要在正文末尾手写重复的作者时间信息

## 2. 分类

文章应根据内容分类，放入相应目录：
- `reading/`：共读笔记类文章
- `thinking/`：工程思考类文章

## 3. 配置更新

添加新文章后，需要更新以下文件：

### 3.1 VitePress 配置
在 `.vitepress/config.js` 文件的 `sidebar` 部分添加新文章链接。

### 3.2 首页
在 `index.md` 文件的文章列表中添加新文章的链接。

## 4. 部署流程

1. 构建项目：`npm run docs:build`
2. 提交更改：`git add . && git commit -m "添加新文章：[文章标题]"`
3. 推送到 GitHub：`git push origin main`
4. 如果推送失败（网络问题），请再次尝试；如果多次仍失败，请手动重试推送命令
5. 等待 GitHub Actions 自动部署完成

## 5. 示例

```markdown
---
articleTitle: 文章标题
author: Yu
publishDate: 2026-04-01
readingTime: 10 分钟
lastUpdated: 2026-04-01
cover: /covers/example.svg
---

文章内容...

## 章节标题

章节内容...

### 子章节标题

子章节内容...
```

请严格遵循以上规则，确保博客内容的一致性和专业性。
