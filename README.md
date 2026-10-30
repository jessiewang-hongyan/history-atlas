# 山河行记

中国历史人物地图交互原型。完整候选名单与已确认产品原则见 [PLAN.md](PLAN.md)。

## 本地运行

无需安装依赖。运行 `python3 -m http.server 4173 --directory dist`，访问 http://localhost:4173 。

## 文件

- `dist/index.html`：页面结构。
- `dist/style.css`：响应式布局与视觉样式。
- `dist/data.js`：六人36个样本节点、46人候选名单、少量战争事件。
- `dist/app.js`：人物切换、年度时间轴、播放、范围切换、地图绘制、图层与资料对话框。
- `dist/land.json`：Natural Earth 1:110m 陆地轮廓，公共领域，来源 https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson ，条款 https://www.naturalearthdata.com/about/terms-of-use/ 。

## 数据边界

政治范围为原创粗略交互示意，不能当作考证疆界。仅制作六人相关时期的部分背景；完整历史模式并不意味着已经完成全时段地图。节点连线不是实际道路。未记录年份显示最近记录，而不是人物当年确定所在地。样本附人物级资料入口，尚未逐条建立学术引文。未导入CBDB、CHGIS；人生随机模拟尚未实现。

## 验证记录（2026-10-30）

- JavaScript 语法检查通过。
- 数据检查：46人，26男20女；6个原型人物，36个按年份排序的节点。
- 浏览器已验证初始地图显示、人物切换、李清照南渡节点、1135年未知位置提示、切换公元前221年完整历史窗口。
- 尚未完成独立移动设备测试及逐条史料核验。
