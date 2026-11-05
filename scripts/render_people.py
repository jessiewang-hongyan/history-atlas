"""Render research dossiers from the single source of truth; no map publication."""
import argparse
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def render(data, person):
    records = person['records']
    counts = Counter(r['status'] for r in records)
    episodes = person.get('episodes', [])
    lines = [f"# {person['name']}人生记录 · 行程细化", '',
             f"初稿日期：{data['preparedAt']}；更新日期：{data.get('updatedAt', data['preparedAt'])}。{person['stage']}。", '',
             f"本轮重点：{person['focus']}", '',
             f"共{len(records)}条年度索引记录，另有{len(episodes)}条未定年阶段；" + '，'.join(f'{k}{v}条' for k, v in counts.items()) + '（仅统计年度记录）。', '',
             '“可采用”指核心事实已有对应材料，不表示历史坐标、整段路线或逐日顺序都已核定。附条件记录保留说明；人生底稿不直接填坐标，已核区域另见 MAP_REVIEW.md。', '',
             '## 人生脉络', '']
    lines += [f'- {s}' for s in person.get('overview', [])]
    lines += ['', '下述概述的依据逐条列在后文。年度索引也包括创作、家庭与组织活动，并非每一项都证明人物身处某地。同年排列用于阅读，不表示已核出连续路线。', '',
              '## 年度记录速览', '', '| 时间 | 地点或关联地点 | 经历 | 类型 |', '| --- | --- | --- | --- |']
    for r in records:
        lines.append(f"| {r['year']} · {r['dateLabel']} | {r['place']} | {r['title']} | {r.get('recordType', '行迹或人生事件')} |")
    lines += ['', '## 对旧样本的处理', '']
    lines += [f'- {s}' for s in person['oldNodeReview']]
    lines += ['', '## 逐条记录', '']
    for r in records:
        lines += [f"### {r['id']} · {r['year']} · {r['place']} · {r['title']}", '',
                  f"日期：{r['dateLabel']}。状态：**{r['status']}**。", '',
                  f"历法说明：{r['calendar']}。", '']
        if r.get('narrative'):
            lines += [r['narrative'], '']
        for ev in r['evidence']:
            s = data['sources'][ev['source']]
            lines += [f"- 出处：[{ev['source']} · {s['title']}]({s['url']})",
                      f"- 定位：{ev['locator']}", f"- 支持范围：{ev['supports']}"]
            if ev.get('quote'):
                lines += ['', f"> {ev['quote']}", '']
        lines += ['', f"限制：{r['limits'] or '暂未发现本条核心事实的冲突；具体地理定位仍需另核。'}", '',
                  f"核验日期：{r['checkedAt']}。地理核验另见 MAP_REVIEW.md。", '']
    if episodes:
        lines += ['## 年份尚未钉定的阶段经历', '', '以下经历已有文献依据，但本轮无法赋予可靠的单一年份。保留文字叙述，不放进年度位置时间轴。', '']
        for item in episodes:
            lines += [f"### {item['id']} · {item['title']}", '',
                      f"阶段：{item['periodLabel']}。地点：{item['place']}。", '', item['narrative'], '']
            for ev in item['evidence']:
                s = data['sources'][ev['source']]
                lines += [f"- 出处：[{ev['source']} · {s['title']}]({s['url']})",
                          f"- 定位：{ev['locator']}", f"- 支持范围：{ev['supports']}"]
                if ev.get('quote'):
                    lines += ['', f"> {ev['quote']}", '']
            lines += ['', f"限制：{item['limits']}", '', f"核验日期：{item['checkedAt']}。不上图。", '']
    if route := person.get('westwardRoute'):
        lines += ['## 西行逐站记录', '']
        source = data['sources'][route['source']]
        for group in route['groups']:
            lines += ['### ' + group['title'], '']
            for stop in group['stops']:
                lines.append(f"- **{stop['place']}**　{stop['note']} [{stop['locator']}]({source['url']})")
                if geo := stop.get('geography'):
                    lines.append(f"  - 今地与地图显示：{geo['modern']}。{geo['note']}")
                    lines.append(f"  - 制图方法：{geo['method']} 数据：{geo.get('xy', geo.get('bounds'))}。")
                    for paragraph in geo.get('comparison', []):
                        lines.append(f"  - 方向与里程对读：{paragraph}")
                    for ref in geo['sources']:
                        citation = data['sources'][ref]
                        lines.append(f"  - 定位出处：[{citation['title']}]({citation['url']})。{citation['limits']}")
            lines.append('')
        if variants := route.get('alternatives'):
            lines += ['### 地图上的候选方案', '', '按作者分别展示；相邻且均可定位的站点以虚线示意先后，不跨越未定位站，不代表复原古道。圈示范围均为编辑绘制。', '']
            for variant in variants:
                lines += [f"#### {variant['code']} · {variant['title']}", '', variant['note'], '']
                for index, node in enumerate(variant['nodes'], 1):
                    lines.append(f"- {variant['code']}{index} · {node['place']}：{node['modern']}。{node['note']} 范围：{node['bounds'] or '未定位'}")
                for ref in variant['sources']:
                    source = data['sources'][ref]
                    lines.append(f"- 出处：[{source['title']}]({source['url']})。{source['limits']}")
                lines.append('')
        for entry in route['dating']:
            source = data['sources'][entry['source']]
            lines.append(f"- {entry['note']} [{entry['locator']}]({source['url']})")
        lines.append('')
    lines += ['## 待核、缺口与排除项', '']
    for item in person['pending']:
        lines += [f"### {item['item']}", '', f"已知：{item['known']}", '',
                  f"缺口／限制：{item['missing']}", '', f"下一步核查：{item['nextCheck']}", '']
    prefixes = {'xuanzang':'XZ-', 'xuxiake':'XX-', 'liqingzhao':'LQ-', 'qinliangyu':'QL-', 'qiujin':'QJ-'}
    lines += ['## 来源目录与使用边界', '']
    for key, s in data['sources'].items():
        if key.startswith(prefixes[person['id']]):
            lines += [f"- **{key}** [{s['title']}]({s['url']})。{s['kind']}。{s['limits']} 核验日期：{s['checkedAt']}。"]
    lines += ['', '## 维护说明', '',
              '本文由 `initial-review.json` 生成。修改事实请先改结构化底稿，再运行 `python3 scripts/render_people.py`。', '',
              '这些记录仍不是完整逐日路线；年度经历已同步网站，经过独立地理核验的部分才增加地图位置。后续按[人物整理流程](../PERSON_WORKFLOW.md)继续。', '']
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    data = json.loads((ROOT / 'research/people/initial-review.json').read_text())
    ids = set()
    total = 0
    episode_total = 0
    for person in data['people']:
        previous = -10**9
        for record in person['records']:
            assert record['id'] not in ids, f"Duplicate ID: {record['id']}"
            ids.add(record['id'])
            assert record['year'] >= previous, record['id']
            previous = record['year']
            if record.get('yearCandidates'):
                assert record['year'] in record['yearCandidates'], record['id']
                assert len(set(record['yearCandidates'])) > 1, record['id']
            assert record['status'] in data['statusPolicy'], record['id']
            assert record['coordinates'] is None, 'Initial review must not silently introduce map coordinates'
            assert record.get('mapReady') is False, 'Research records require a separate map review'
            assert record['evidence'], record['id']
            for evidence in record['evidence']:
                assert evidence['source'] in data['sources'], record['id']
                assert evidence['locator'] and evidence['supports'], record['id']
            total += 1
        for episode in person.get('episodes', []):
            assert episode['id'] not in ids, episode['id']
            ids.add(episode['id'])
            assert episode['year'] is None and episode['mapReady'] is False, episode['id']
            assert episode['periodLabel'] and episode['narrative'] and episode['limits'], episode['id']
            assert episode['evidence'], episode['id']
            for evidence in episode['evidence']:
                assert evidence['source'] in data['sources'], episode['id']
                assert evidence['locator'] and evidence['supports'], episode['id']
            episode_total += 1
        content = render(data, person)
        path = ROOT / f"research/people/{person['id']}.md"
        if args.check:
            assert path.read_text() == content, f'Stale report: {path}'
        else:
            path.write_text(content)
    print(f"{'Checked' if args.check else 'Rendered'} {len(data['people'])} dossiers, {total} annual records, {episode_total} undated episodes, {len(data['sources'])} sources.")


if __name__ == '__main__':
    main()
