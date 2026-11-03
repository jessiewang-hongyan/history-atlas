# 地理底图来源与边界

更新日期：2026-11-03。

- [Natural Earth 1:50m Physical Vectors](https://www.naturalearthdata.com/downloads/50m-physical-vectors/)：陆地、河流、湖泊。
- [Natural Earth 使用条款](https://www.naturalearthdata.com/about/terms-of-use/)：公共领域。
- 原始 GeoJSON：[陆地](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson)、[河流及湖泊中心线](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_rivers_lake_centerlines.geojson)、[湖泊](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_lakes.geojson)。来源为 Natural Earth 维护者的 GitHub 数据仓库。

## 数据处理

将上述文件分别保存为 `land.json`、`rivers_lake_centerlines.json`、`lakes.json`，置于同一输入目录，执行 `python3 scripts/prepare-map.py 输入目录`。

陆地保留全球要素；水系选取含有东经40—150度、南纬10—北纬65度范围内顶点的完整要素，并非行政区裁切。删除标注为 Reservoir 的水库与 Lake Centerline 的湖泊中心线；其他自然湖泊及河流保留。坐标保留四位小数，仅用于减小数据文件，不意味着具有相应测量精度。最终包含1420个陆地要素、185个水系要素。

## 历史解释边界

这是现代地理参照，海岸线、河道、湖泊范围没有按历史年份重建。尤其黄河改道、湖泊消长和海岸变化，不能由本图反推。水系可单独关闭。没有导入现代行政边界；原政治色块依然是交互示意。人物节点仍是既有资料中的近似坐标，连线并非考证道路。

地图宽度提示按视野中心纬度估算，不是测距工具。定位按钮指向最近一条人物记录，不能解释为史料空白年份的确切位置。为避免文字遮挡，同地点只保留最近节点的标记，部分地名在缩小视野时隐藏；全部记录仍可通过人生节点查看。
