### **Concise**

## Notice: De-GitHubbed

本仓库已停止在 GitHub 的开发，移至个人自建[Git 实例](https://git.verdant.ee/)。后续的所有提交与权威上游均以新地址为准。

本项目拒绝使用任何基于网页端的 Pull Request。若您发现了 Bug 或有改进意愿，请直接在本地使用 `git format-patch` 生成 patch 文件，并发送到 `im@verdant.ee`。

---

A minimalist Hugo theme focused on writing.

![homepage](https://raw.githubusercontent.com/yingyu5658/hugo-theme-concise/refs/heads/main/images/homepage.png)
![post](https://raw.githubusercontent.com/yingyu5658/hugo-theme-concise/refs/heads/main/images/tn.png)
![single](https://raw.githubusercontent.com/yingyu5658/hugo-theme-concise/refs/heads/main/images/screenshot.png)

---

### **Features**
- **Extremely Minimalist Design**
- **No Unnecessary Features**
- **Focus on the Essence of Blogging**

---

### **Quick Start**
```bash
git clone https://github.com/yingyu5658/hugo-theme-concise.git themes/concise
```

Add the following configuration to `hugo.toml` in your site's root directory:
```toml
baseURL = "..."
publishDir = "public"
title = "YOUR_WEBSITE_TITLE"
description = "SUBTITLE"
languageCode = "zh-CN"
theme = ["concise"]
pagination = { pagerSize = 25 }

[permalinks]
posts = "YOUR_PERMALINKS"

[params]
[[params.homepage.content]]
name = "Archives"# Posts archive
url = "/post"

[[params.homepage.content]]
name = "Links"# Friend links
url = "/links"

[[params.homepage.content]]
name = "About"
url = "/about"

[[params.homepage.content]]
name = "RSS"
url = "/atom.xml"

[params.footer]
content = "Email: YOUR_EMAIL"

[markup.highlight]
noClasses = true
style = "emacs"# Options: github, emacs, solarized-light, etc.

[outputFormats.RSS]
baseName = "atom"
```

---

### **Comments**
- **Waline Comment System Support**

Modify `serverURL` in `layouts/_default/single.html`:
```html
<script type="module">
import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
init({
el: '#waline',
serverURL: '' // ← Replace with your Waline server URL
});
</script>
```
