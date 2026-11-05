/* Selected political and military events. Annual display is not a daily chronology. */
const HISTORY_SOURCES = {
  "T2": {
    "name": "《旧唐书》卷二·太宗上",
    "url": "https://zh.wikisource.org/wiki/舊唐書/卷2",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "T3": {
    "name": "《旧唐书》卷三·太宗下",
    "url": "https://zh.wikisource.org/wiki/舊唐書/卷3",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "S14": {
    "name": "《宋史》卷014",
    "url": "https://zh.wikisource.org/wiki/宋史/卷014",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "S16": {
    "name": "《宋史》卷016",
    "url": "https://zh.wikisource.org/wiki/宋史/卷016",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "S17": {
    "name": "《宋史》卷017",
    "url": "https://zh.wikisource.org/wiki/宋史/卷017",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "S18": {
    "name": "《宋史》卷018",
    "url": "https://zh.wikisource.org/wiki/宋史/卷018",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "S23": {
    "name": "《宋史》卷023",
    "url": "https://zh.wikisource.org/wiki/宋史/卷023",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "S26": {
    "name": "《宋史》卷026",
    "url": "https://zh.wikisource.org/wiki/宋史/卷026",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "S29": {
    "name": "《宋史》卷029",
    "url": "https://zh.wikisource.org/wiki/宋史/卷029",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "M21": {
    "name": "《明史》卷二十一·神宗二",
    "url": "https://zh.wikisource.org/wiki/明史/卷21",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "M23": {
    "name": "《明史》卷二十三·庄烈帝一",
    "url": "https://zh.wikisource.org/wiki/明史/卷23",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "M24": {
    "name": "《明史》卷二十四·庄烈帝二",
    "url": "https://zh.wikisource.org/wiki/明史/卷24",
    "type": "古代史籍在线录文",
    "checkedAt": "2026-11-02"
  },
  "QIN": {
    "name": "重庆市地方志办公室·秦良玉",
    "url": "https://dfz.cq.gov.cn/zqlswh/rwby_417819/202311/t20231102_12510540.html",
    "type": "地方志机构人物介绍",
    "checkedAt": "2026-11-02"
  },
  "JIAWU": {
    "name": "故宫博物院·甲午战争",
    "url": "https://www.dpm.org.cn/lemmas/241772.html",
    "type": "博物馆词条",
    "checkedAt": "2026-11-02"
  },
  "WUXU": {
    "name": "故宫博物院·戊戌变法",
    "url": "https://www.dpm.org.cn/lemmas/241774.html",
    "type": "博物馆词条",
    "checkedAt": "2026-11-02"
  },
  "GENGZI": {
    "name": "邢永福·八国联军侵华档案首次系统公布（故宫网站）",
    "url": "https://www.dpm.org.cn/Uploads/pdf/3476/T00006_00.pdf",
    "type": "档案介绍文章",
    "checkedAt": "2026-11-02"
  },
  "EXAM": {
    "name": "国家档案局·“清代金榜”简介",
    "url": "https://www.saac.gov.cn/daj/lhgjk/201808/5d6abe19006d47489327b05524a38cc5.shtml",
    "type": "档案机构说明",
    "checkedAt": "2026-11-02"
  },
  "LEAGUE": {
    "name": "中国国家博物馆·同盟会成立",
    "url": "https://www.chnmuseum.cn/zp/zpml/ysp/202012/t20201214_248423.shtml",
    "type": "博物馆藏品说明",
    "checkedAt": "2026-11-02"
  },
  "QIU": {
    "name": "中国共产党新闻网·“巾帼英雄”——秋瑾",
    "url": "https://dangshi.people.com.cn/n1/2018/0407/c85037-29909960.html",
    "type": "人物史事介绍",
    "checkedAt": "2026-11-02"
  }
};
const HISTORY_EVENTS = [
  {
    "id": "tang-626",
    "type": "political",
    "start": 626,
    "end": 626,
    "name": "玄武门之变与太宗即位",
    "place": "长安",
    "xy": [
      108.94,
      34.26
    ],
    "date": "武德九年六月、八月",
    "text": "李世民在玄武门政变后被立为太子，同年继位。",
    "note": "分月记载合为年度节点；史书带有立场，不沿用其对政变的褒贬。",
    "source": "T2",
    "locator": "武德九年六月、八月条",
    "quote": "八月癸亥，高祖傳位於皇太子，太宗即位於東宮顯德殿。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "tang-627",
    "type": "political",
    "start": 627,
    "end": 627,
    "name": "改元贞观",
    "place": "长安",
    "xy": [
      108.94,
      34.26
    ],
    "date": "贞观元年正月",
    "text": "唐太宗改元贞观。玄奘西行前后处于这一时期。",
    "note": "这是改元节点，不把整个贞观时期当作一件持续发生的事件。",
    "source": "T2",
    "locator": "贞观元年春正月条",
    "quote": "貞觀元年春正月乙酉，改元。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "tang-630",
    "type": "military",
    "start": 630,
    "end": 630,
    "name": "唐军击败东突厥",
    "place": "定襄—阴山区域",
    "xy": [
      111.8,
      40.7
    ],
    "date": "贞观四年正月至三月",
    "text": "李靖等部击败东突厥，颉利可汗被俘。",
    "note": "点位代表战事区域，多路行军和战场尚未重建；不表示玄奘在场。",
    "source": "T3",
    "locator": "贞观四年正月、二月、三月条",
    "quote": "李靖又破突厥於陰山",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "tang-640-war",
    "type": "military",
    "start": 640,
    "end": 640,
    "name": "唐军攻取高昌",
    "place": "高昌",
    "xy": [
      89.53,
      42.85
    ],
    "date": "贞观十四年八月",
    "text": "侯君集率军攻取高昌。玄奘此前曾在高昌停留，两者不是同年事件。",
    "note": "点位为高昌古城区域示意，不画战线。",
    "source": "T3",
    "locator": "贞观十四年八月条",
    "quote": "侯君集平高昌，以其地置西州。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "tang-640-office",
    "type": "political",
    "start": 640,
    "end": 640,
    "name": "设置安西都护府",
    "place": "西州",
    "xy": [
      89.2,
      42.95
    ],
    "date": "贞观十四年九月",
    "text": "唐在西州设置安西都护府。",
    "note": "这是设置节点，不把历次治所迁移或全部管辖区画成固定疆界。",
    "source": "T3",
    "locator": "贞观十四年九月条",
    "quote": "乙卯，於西州置安西都護府。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "tang-641",
    "type": "political",
    "start": 641,
    "end": 641,
    "name": "文成公主入吐蕃",
    "place": "长安—吐蕃",
    "xy": null,
    "date": "贞观十五年正月遣送",
    "text": "唐廷遣李道宗送文成公主入吐蕃，形成唐蕃和亲关系。",
    "note": "本条记遣送，不推定抵达日期或精确行走路线。",
    "source": "T3",
    "locator": "贞观十五年正月条",
    "quote": "禮部尚書、江夏王道宗送文成公主歸吐蕃。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1069",
    "type": "political",
    "start": 1069,
    "end": 1069,
    "name": "熙宁变法启动",
    "place": "汴京",
    "xy": [
      114.31,
      34.8
    ],
    "date": "熙宁二年二月",
    "text": "王安石任参知政事，与陈升之创置三司条例，议行新法。",
    "note": "只显示启动年；新法后续推行、废改各有日期，不以单一结束年概括。",
    "source": "S14",
    "locator": "熙宁二年二月条",
    "quote": "陳升之、王安石創置三司條例，議行新法。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1081",
    "type": "military",
    "start": 1081,
    "end": 1081,
    "name": "宋对西夏发动多路攻势",
    "place": "宋夏边境",
    "xy": [
      106.2,
      38.1
    ],
    "date": "元丰四年七月起",
    "text": "宋廷命陕西、河东诸路出兵攻夏。",
    "note": "区域点表示宋夏战事，不是五路军队汇合点；战役细部待补。",
    "source": "S16",
    "locator": "元丰四年七月至十月条",
    "quote": "詔陝西、河東路討之",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1082-office",
    "type": "political",
    "start": 1082,
    "end": 1082,
    "name": "元丰官制施行",
    "place": "汴京",
    "xy": [
      114.31,
      34.8
    ],
    "date": "元丰五年五月",
    "text": "宋廷施行新官制，调整中央机构及官名职掌。",
    "note": "只记正式施行节点，此前议定过程不合并为本年发生。",
    "source": "S16",
    "locator": "元丰五年四月、五月条",
    "quote": "五月辛已朔，行官制。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1082-war",
    "type": "military",
    "start": 1082,
    "end": 1082,
    "name": "永乐城之战",
    "place": "米脂一带",
    "xy": [
      110.18,
      37.76
    ],
    "date": "元丰五年九月",
    "text": "西夏军围攻永乐城，宋军失守，徐禧等战死。",
    "note": "采用米脂区域示意；不采史书记载的兵力数字为已核统计。",
    "source": "S16",
    "locator": "元丰五年九月条",
    "quote": "戊戌，永樂陷",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1085",
    "type": "political",
    "start": 1085,
    "end": 1085,
    "name": "哲宗即位，高太后听政",
    "place": "汴京",
    "xy": [
      114.31,
      34.8
    ],
    "date": "元丰八年三月",
    "text": "神宗去世，哲宗继位，高太后参与听政，朝廷权力结构发生变化。",
    "note": "不将即位当天与随后逐项废改新法混成同一时间。",
    "source": "S17",
    "locator": "元丰八年三月条",
    "quote": "神宗崩，太子即皇帝位。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1094",
    "type": "political",
    "start": 1094,
    "end": 1094,
    "name": "绍圣更化与元祐官员受贬",
    "place": "汴京",
    "xy": [
      114.31,
      34.8
    ],
    "date": "绍圣元年四月至七月",
    "text": "章惇任相，朝廷恢复部分旧新法，元祐官员遭贬。苏轼同年被谪惠州。",
    "note": "政治中心标在汴京；不是苏轼被贬当时的个人位置。",
    "source": "S18",
    "locator": "绍圣元年四月、六月、七月条",
    "quote": "丁卯，詔諸路復元豐免役法。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1127-war",
    "type": "military",
    "start": 1127,
    "end": 1127,
    "name": "靖康之变",
    "place": "汴京",
    "xy": [
      114.31,
      34.8
    ],
    "date": "靖康二年；接续前一年围城",
    "text": "金军控制汴京，徽宗、钦宗等被带往北方，北宋朝廷覆亡。",
    "note": "本条只记1127年的变故；围城前史及之后南侵分别记，不延长至1130。",
    "source": "S23",
    "locator": "靖康二年二月至四月条",
    "quote": "金人以帝及皇后、皇太子北歸。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1127-court",
    "type": "political",
    "start": 1127,
    "end": 1127,
    "name": "赵构即位，南宋政权建立",
    "place": "应天府",
    "xy": [
      115.65,
      34.4
    ],
    "date": "建炎元年五月",
    "text": "赵构在南京应天府即位，延续宋朝政权。",
    "note": "这里的南京为今商丘一带，不是今南京；本条不表示当年已定都杭州。",
    "source": "S23",
    "locator": "靖康二年五月条",
    "quote": "五月庚寅朔，康王即位于南京",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1130",
    "type": "military",
    "start": 1130,
    "end": 1130,
    "name": "金军进攻明州，高宗沿海避兵",
    "place": "明州—浙东沿海",
    "xy": [
      121.55,
      29.87
    ],
    "date": "建炎四年正月",
    "text": "金军进攻明州等地，高宗乘船转徙浙东沿海。",
    "note": "点位仅代表宁波区域；皇帝行程与李清照行程不能互相替代。",
    "source": "S26",
    "locator": "建炎四年正月条",
    "quote": "金人犯明州，張俊及守臣劉洪道擊卻之。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1138",
    "type": "political",
    "start": 1138,
    "end": 1138,
    "name": "朝廷驻跸临安趋于稳定",
    "place": "临安",
    "xy": [
      120.15,
      30.25
    ],
    "date": "绍兴八年",
    "text": "《宋史》于本年记“始定都于杭”，用于标示临安政治中心的确立。",
    "note": "杭州此前已有驻跸；“行在”与后世“定都”的措辞不同，保留来源表述。",
    "source": "S29",
    "locator": "绍兴八年末条",
    "quote": "是歲，始定都于杭。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "song-1141",
    "type": "political",
    "start": 1141,
    "end": 1141,
    "name": "绍兴和议达成",
    "place": "宋金之间",
    "xy": null,
    "date": "绍兴十一年十一月",
    "text": "宋金达成和议，规定疆界与岁币等条件。",
    "note": "这是达成盟议节点；换文、落实和边界细节不全部压到本年，未据此绘疆界。",
    "source": "S29",
    "locator": "绍兴十一年十一月条",
    "quote": "與金國和議成，立盟書",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "ming-1600",
    "type": "military",
    "start": 1600,
    "end": 1600,
    "name": "播州战役主要攻势",
    "place": "播州一带",
    "xy": [
      106.93,
      27.73
    ],
    "date": "万历二十八年二月至六月",
    "text": "明军分八路进讨，六月攻克海龙囤，杨应龙自尽。",
    "note": "此前已有冲突；此条只记1600年主要攻势，不把整个播州冲突限于一年。",
    "source": "M21",
    "locator": "万历二十八年二月、六月条",
    "quote": "克海龍囤，楊應龍自縊死，播州平。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "ming-1619",
    "type": "military",
    "start": 1619,
    "end": 1619,
    "name": "萨尔浒之战",
    "place": "抚顺东部区域",
    "xy": [
      124.3,
      41.85
    ],
    "date": "万历四十七年二月至三月",
    "text": "明军分路出塞，杜松、马林、刘綎等部先后失利。",
    "note": "后金在清修《明史》中被追称“大清”；图点是战役区域，不是各路营址。",
    "source": "M21",
    "locator": "万历四十七年二月、三月条",
    "quote": "杜松遇大清兵於吉林崖，戰死。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "ming-1621",
    "type": "military",
    "start": 1621,
    "end": 1621,
    "name": "奢崇明起兵",
    "place": "重庆—成都区域",
    "xy": [
      106.55,
      29.56
    ],
    "date": "天启元年九月起",
    "text": "奢崇明起兵，秦良玉组织石砫兵参与应对。",
    "note": "本条仅记录起兵年份；后续奢安战事不能据此视为已结束。",
    "source": "QIN",
    "locator": "“天启元年（1621年）九月”段",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "ming-1629",
    "type": "military",
    "start": 1629,
    "end": 1630,
    "name": "己巳之变及京畿战事",
    "place": "北京—遵化区域",
    "xy": [
      116.4,
      39.9
    ],
    "date": "崇祯二年十月至三年五月",
    "text": "后金入塞迫近北京，各路明军入援；次年后金军东归，部分城池收复。",
    "note": "起止按史书纪年，非公历逐日换算；以北京代表京畿，不覆盖所有战场。",
    "source": "M23",
    "locator": "崇祯二年十月至三年五月条",
    "quote": "大清兵東歸，永平、遷安、遵化相繼復。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "ming-1634",
    "type": "military",
    "start": 1634,
    "end": 1634,
    "name": "夔州战事",
    "place": "夔州",
    "xy": [
      109.46,
      31.02
    ],
    "date": "崇祯七年；年级",
    "text": "秦良玉与马祥麟部在夔州对张献忠部作战。",
    "note": "沿用地方志机构叙述，尚未与原始军报逐条互校；年级、区域级记录。",
    "source": "QIN",
    "locator": "“崇祯七年（1634年）”段",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "ming-1644-court",
    "type": "political",
    "start": 1644,
    "end": 1644,
    "name": "北京政权更替",
    "place": "北京",
    "xy": [
      116.4,
      39.9
    ],
    "date": "崇祯十七年三月、五月",
    "text": "李自成军进入北京，崇祯帝死；随后清军进入北京。",
    "note": "仅表示北京政治中心更替，不代表1644年各地已同步改属或战争结束。",
    "source": "M24",
    "locator": "崇祯十七年三月、五月条",
    "quote": "內城陷。帝崩於萬歲山",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "ming-1644-war",
    "type": "military",
    "start": 1644,
    "end": 1644,
    "name": "山海关之战",
    "place": "山海关",
    "xy": [
      119.75,
      40
    ],
    "date": "崇祯十七年四月",
    "text": "清军在山海关击败李自成军，随后进入北京。",
    "note": "只录该次战役，不用1644—1648的任意区间代指全部明清战争。",
    "source": "M24",
    "locator": "崇祯十七年四月条",
    "quote": "是年夏四月，我大清兵破賊於山海關。",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "qing-1894",
    "type": "military",
    "start": 1894,
    "end": 1895,
    "name": "甲午战争",
    "place": "朝鲜半岛、黄海及辽东山东",
    "xy": [
      122.1,
      37.5
    ],
    "date": "1894—1895年",
    "text": "中日甲午战争爆发，清军在海陆战场失利。",
    "note": "地图以威海区域代表战事之一，不能据此推断整场战争只发生在该点。",
    "source": "JIAWU",
    "locator": "词条首段",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "qing-1898",
    "type": "political",
    "start": 1898,
    "end": 1898,
    "name": "戊戌变法",
    "place": "北京",
    "xy": [
      116.4,
      39.9
    ],
    "date": "光绪二十四年四月二十三日至八月初六（旧历）",
    "text": "清廷推行制度、经济、教育等改革；政变后主要措施被废止。",
    "note": "来源日期为旧历；年度展示不作公历逐日换算。",
    "source": "WUXU",
    "locator": "词条正文",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "qing-1900",
    "type": "military",
    "start": 1900,
    "end": 1900,
    "name": "八国联军攻入北京",
    "place": "北京",
    "xy": [
      116.4,
      39.9
    ],
    "date": "1900年8月14日（公历）",
    "text": "八国联军攻入北京，慈禧与光绪离京。",
    "note": "只记攻入北京这一节点；不以本条覆盖全部庚子战争及占领时期。",
    "source": "GENGZI",
    "locator": "首页“世纪回眸”及“六千清宫珍档”段",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "qing-1901",
    "type": "political",
    "start": 1901,
    "end": 1901,
    "name": "《辛丑条约》签订",
    "place": "北京",
    "xy": [
      116.4,
      39.9
    ],
    "date": "1901年9月7日（公历）",
    "text": "清政府与列强签订《辛丑条约》。",
    "note": "这是签约节点；条约条款与长期影响尚未分项建模。",
    "source": "GENGZI",
    "locator": "首页首段",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "qing-1905-exam",
    "type": "political",
    "start": 1905,
    "end": 1905,
    "name": "废除科举",
    "place": "北京",
    "xy": [
      116.4,
      39.9
    ],
    "date": "光绪三十一年；年级",
    "text": "清廷废除科举制度，传统取士制度发生重大变化。",
    "note": "科举废除与各类新式学校的具体开办日期分别记录。",
    "source": "EXAM",
    "locator": "简介关于1905年科举终止段",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "qing-1905-league",
    "type": "political",
    "start": 1905,
    "end": 1905,
    "name": "中国同盟会成立",
    "place": "东京",
    "xy": [
      139.69,
      35.68
    ],
    "date": "1905年8月20日（公历）",
    "text": "中国同盟会在东京成立，孙中山被推举为总理。",
    "note": "中国政治史事件不必发生在境内；此条不自动推定秋瑾参加当日会议。",
    "source": "LEAGUE",
    "locator": "藏品说明首段",
    "quote": "",
    "checkedAt": "2026-11-02"
  },
  {
    "id": "qing-1907",
    "type": "military",
    "start": 1907,
    "end": 1907,
    "name": "安庆起义失败",
    "place": "安庆",
    "xy": [
      117.05,
      30.53
    ],
    "date": "1907年7月6日（公历）",
    "text": "安庆起义失败，随后绍兴大通学堂被清兵包围，秋瑾被捕。",
    "note": "标记安庆事件，不把秋瑾画到安庆；两地行动分属不同人物。",
    "source": "QIU",
    "locator": "起义失败与大通学堂被围段",
    "quote": "",
    "checkedAt": "2026-11-02"
  }
];
const historyAt = (y, type="all") => HISTORY_EVENTS.filter(e => e.start <= y && y <= e.end && (type === "all" || e.type === type));
const historyInRange = (min,max,type="all") => HISTORY_EVENTS.filter(e=>e.end>=min&&e.start<=max&&(type==="all"||e.type===type));

// Map memory is a viewing preference; it never changes the historical dates.
const historyVisible=(year,years=3,type='all')=>HISTORY_EVENTS.filter(e=>e.start<=year && year<=e.end+years && (type==='all'||e.type===type));
