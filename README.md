# 山河行记

中国历史人物地图交互原型。完整候选名单与已确认产品原则见 [PLAN.md](PLAN.md)。

## 源码与托管

源码托管于公开 GitHub 仓库 `jessiewang-hongyan/history-atlas`。按用户选择，仓库于2026-10-30改为公开并启用 GitHub Pages；不再发布到 Sites。

演示地址：https://jessiewang-hongyan.github.io/history-atlas/

推送 `main` 分支的 `dist/` 或 Pages 工作流变更会触发自动部署，也可以在 Actions 中手动运行。工作流检查 JavaScript 语法后仅发布 `dist/` 目录。

## 本地运行

无需安装依赖。运行 `python3 -m http.server 4173 --directory dist`，访问 http://localhost:4173 。

## 文件

- `dist/index.html`：页面结构。
- `dist/style.css`：响应式布局与视觉样式。
- `dist/data.js`：其他五人29个样本节点；苏轼节点见 sushi.js、46人候选名单、少量战争事件。
- `dist/sushi.js`：苏轼全生涯首轮核验的91条附出处记录。
- `dist/sushi-audit.html`：可公开阅读的逐条核验表、异说与待核清单。
- `research/SUSHI_AUDIT.md`：同版核验报告，古代文本引文为公有领域。
- `dist/app.js`：人物切换、年度时间轴、播放、范围切换、地图绘制、图层与资料对话框。
- `dist/land.json`：Natural Earth 1:110m 陆地轮廓，公共领域，来源 https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson ，条款 https://www.naturalearthdata.com/about/terms-of-use/ 。

## 数据边界

政治范围为原创粗略交互示意，不能当作考证疆界。仅制作六人相关时期的部分背景；完整历史模式并不意味着已经完成全时段地图。节点连线不是实际道路。未记录年份显示最近记录，而不是人物当年确定所在地。苏轼已建立节点级出处及异说说明；其他五人仍只有人物级资料入口。苏轼也不是穷尽全集的完整行程：未核定的游访、坐标、具体到达日不补造。未导入CBDB、CHGIS；人生随机模拟尚未实现。

## 验证记录（2026-10-30）

- JavaScript 语法检查通过。
- 数据检查：46人，26男20女；6个原型人物，原始版本36个节点；本次苏轼由7条扩为91条，总计120条。
- 浏览器已验证初始地图显示、人物切换、李清照南渡节点、1135年未知位置提示、切换公元前221年完整历史窗口。
- 已验证425像素窄屏：页面无横向溢出，地图后紧接时间轴，拖动至1097年可更新苏轼儋州节点，人物册弹窗保持在视口内；1265像素内容视口无溢出。
- 尚未完成独立移动设备测试；苏轼史料核验范围与缺口见报告。

### 苏轼核验更新

- 91条记录的排序、唯一ID、坐标有效性和来源引用检查通过，六人合计120条。
- 浏览器验证1097年藤州→雷州同年切换、当前节点出处、空白年份提示及其他人物切换。
- 窄屏内容视口410px、页面宽410px；桌面1265px无横向溢出。长节点列表独立滚动。
- 仅为全生涯首轮核验，不表示已穷尽全集；古代年谱日月冲突、未展开游踪与地理校准缺口保留在核验报告中。
