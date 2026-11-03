"""Render research dossiers from the single source of truth; no map publication."""
import argparse
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def render(data, person):
    records = person['records']
    counts = Counter(r['status'] for r in records)
    lines = [f"# {person['name']}人生记录 · 首轮底稿", '',
             f"整理日期：{data['preparedAt']}。{person['stage']}。", '',
             f"本轮重点：{person['focus']}", '',
             f"共{len(records)}条记录；" + '，'.join(f'{k}{v}条' for k, v in counts.items()) + '。', '',
             '“可采用”指核心事实已有对应材料，不表示历史坐标、整段路线或逐日顺序都已核定。附条件记录必须保留说明；所有坐标尚为空。', '',
             '## 对旧样本的处理', '']
    lines += [f'- {s}' for s in person['oldNodeReview']]
    lines += ['', '## 逐条记录', '']
    for r in records:
        lines += [f"### {r['id']} · {r['year']} · {r['place']} · {r['title']}", '',
                  f"日期：{r['dateLabel']}。状态：**{r['status']}**。", '',
                  f"历法说明：{r['calendar']}。", '']
        for ev in r['evidence']:
            s = data['sources'][ev['source']]
            lines += [f"- 出处：[{ev['source']} · {s['title']}]({s['url']})",
                      f"- 定位：{ev['locator']}", f"- 支持范围：{ev['supports']}"]
        lines += ['', f"限制：{r['limits'] or '暂未发现本条核心事实的冲突；具体地理定位仍需另核。'}", '',
                  f"核验日期：{r['checkedAt']}。坐标：未校准。", '']
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
              '本轮没有给出完整逐日路线，也没有把这些候选记录自动发布为地图节点。后续按[人物整理流程](../PERSON_WORKFLOW.md)继续。', '']
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    data = json.loads((ROOT / 'research/people/initial-review.json').read_text())
    ids = set()
    total = 0
    for person in data['people']:
        previous = -10**9
        for record in person['records']:
            assert record['id'] not in ids, f"Duplicate ID: {record['id']}"
            ids.add(record['id'])
            assert record['year'] >= previous, record['id']
            previous = record['year']
            assert record['status'] in data['statusPolicy'], record['id']
            assert record['coordinates'] is None, 'Initial review must not silently introduce map coordinates'
            assert record['evidence'], record['id']
            for evidence in record['evidence']:
                assert evidence['source'] in data['sources'], record['id']
                assert evidence['locator'] and evidence['supports'], record['id']
            total += 1
        content = render(data, person)
        path = ROOT / f"research/people/{person['id']}.md"
        if args.check:
            assert path.read_text() == content, f'Stale report: {path}'
        else:
            path.write_text(content)
    print(f"{'Checked' if args.check else 'Rendered'} {len(data['people'])} dossiers, {total} records, {len(data['sources'])} sources.")


if __name__ == '__main__':
    main()
