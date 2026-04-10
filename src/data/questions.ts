import type { Question } from '@/types'

export const questions: Question[] = [
  {
    id: 1,
    title: '你到了雪场，第一件事是？',
    options: [
      { label: 'A', text: '先拍张美照发朋友圈"已到战场"', weights: [{ dimensionId: 'S2', score: 2 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'B', text: '换好装备直冲缆车，一秒不浪费', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'V1', score: 1 }] },
      { label: 'C', text: '找个咖啡厅坐下来先缓缓', weights: [{ dimensionId: 'V1', score: 2 }, { dimensionId: 'S1', score: 1 }] }
    ]
  },
  {
    id: 2,
    title: '你更倾向于选择哪种板子？',
    options: [
      { label: 'A', text: '单板，帅就完了', weights: [{ dimensionId: 'T2', score: 1 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'B', text: '双板，稳定高效速度快', weights: [{ dimensionId: 'T2', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'C', text: '都行，能滑就行，主要看心情', weights: [{ dimensionId: 'V1', score: 2 }] }
    ]
  },
  {
    id: 3,
    title: '雪友群里有人晒新买的顶级雪板，你的反应是？',
    options: [
      { label: 'A', text: '已经在研究参数准备下单了', weights: [{ dimensionId: 'E1', score: 2 }, { dimensionId: 'E2', score: 2 }] },
      { label: 'B', text: '点个赞，心里想着"我的也不差"', weights: [{ dimensionId: 'E1', score: 1 }] },
      { label: 'C', text: '完全不关心，技术才是核心竞争力', weights: [{ dimensionId: 'T1', score: 2 }] }
    ]
  },
  {
    id: 4,
    title: '面对一条没滑过的黑道，你会？',
    options: [
      { label: 'A', text: 'SEND IT！冲就对了！', weights: [{ dimensionId: 'A1', score: 3 }] },
      { label: 'B', text: '先在旁边观察一下别人怎么滑', weights: [{ dimensionId: 'T1', score: 1 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'C', text: '算了，我还是回蓝道吧，命比面子重要', weights: [{ dimensionId: 'A1', score: 0 }, { dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 5,
    title: '你滑雪时的穿搭风格是？',
    options: [
      { label: 'A', text: '全身配色精心搭配，雪镜头盔都要好看', weights: [{ dimensionId: 'V2', score: 2 }, { dimensionId: 'S2', score: 1 }] },
      { label: 'B', text: '功能性第一，什么暖和穿什么', weights: [{ dimensionId: 'T1', score: 1 }] },
      { label: 'C', text: '随便套上就走，反正都要摔', weights: [{ dimensionId: 'V2', score: 0 }] }
    ]
  },
  {
    id: 6,
    title: '你在缆车上最常做的事是？',
    options: [
      { label: 'A', text: '跟旁边的陌生人聊起来了', weights: [{ dimensionId: 'S1', score: 3 }] },
      { label: 'B', text: '刷手机看滑雪教学视频', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'E2', score: 1 }] },
      { label: 'C', text: '看风景拍照，享受这一刻', weights: [{ dimensionId: 'S2', score: 1 }, { dimensionId: 'V1', score: 2 }] }
    ]
  },
  {
    id: 7,
    title: '你的滑雪装备总花费大概在？',
    options: [
      { label: 'A', text: '五位数起步，顶配就是信仰', weights: [{ dimensionId: 'E1', score: 3 }, { dimensionId: 'E2', score: 1 }] },
      { label: 'B', text: '中档够用，性价比才是王道', weights: [{ dimensionId: 'E1', score: 1 }] },
      { label: 'C', text: '租的…或者闲鱼淘的', weights: [{ dimensionId: 'E1', score: 0 }] }
    ]
  },
  {
    id: 8,
    title: '朋友约你周末去滑雪，但你刚去过，你会？',
    options: [
      { label: 'A', text: '去！每次去都有新体验', weights: [{ dimensionId: 'T1', score: 1 }, { dimensionId: 'S1', score: 1 }] },
      { label: 'B', text: '看情况，主要看谁去', weights: [{ dimensionId: 'S1', score: 2 }] },
      { label: 'C', text: '算了，在家躺着不好吗', weights: [{ dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 9,
    title: '你理想的滑雪目的地是？',
    options: [
      { label: 'A', text: '日本北海道/欧洲阿尔卑斯，追最好的粉雪', weights: [{ dimensionId: 'A2', score: 3 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'B', text: '国内大型雪场就很满足了', weights: [{ dimensionId: 'A2', score: 1 }] },
      { label: 'C', text: '离家最近的那个就行', weights: [{ dimensionId: 'A2', score: 0 }, { dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 10,
    title: '你怎么看"刻滑"这件事？',
    options: [
      { label: 'A', text: '刻滑是信仰！完美弧线是终极浪漫', weights: [{ dimensionId: 'T2', score: 3 }, { dimensionId: 'T1', score: 2 }] },
      { label: 'B', text: '会一点，但不执着', weights: [{ dimensionId: 'T2', score: 1 }] },
      { label: 'C', text: '那是什么？能吃吗？', weights: [{ dimensionId: 'T1', score: 0 }] }
    ]
  },
  {
    id: 11,
    title: '拍滑雪视频时，你更在意？',
    options: [
      { label: 'A', text: '动作要帅，技术要到位', weights: [{ dimensionId: 'T1', score: 1 }, { dimensionId: 'S2', score: 1 }] },
      { label: 'B', text: '画面要美，滤镜要对，BGM要配', weights: [{ dimensionId: 'S2', score: 3 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'C', text: '我从来不拍视频', weights: [{ dimensionId: 'S2', score: 0 }] }
    ]
  },
  {
    id: 12,
    title: '你对公园跳台的态度是？',
    options: [
      { label: 'A', text: '我就是为了跳台来的！飞起来的感觉太爽了', weights: [{ dimensionId: 'A1', score: 3 }, { dimensionId: 'T2', score: 1 }] },
      { label: 'B', text: '小跳台试试，大的算了', weights: [{ dimensionId: 'A1', score: 1 }] },
      { label: 'C', text: '远观即可，我怕死', weights: [{ dimensionId: 'A1', score: 0 }] }
    ]
  },
  {
    id: 13,
    title: '你买装备前会？',
    options: [
      { label: 'A', text: '看至少 10 篇测评，对比参数到凌晨三点', weights: [{ dimensionId: 'E2', score: 3 }] },
      { label: 'B', text: '问问雪友推荐，看看评价就下单', weights: [{ dimensionId: 'E2', score: 1 }, { dimensionId: 'S1', score: 1 }] },
      { label: 'C', text: '哪个好看买哪个', weights: [{ dimensionId: 'V2', score: 1 }, { dimensionId: 'E2', score: 0 }] }
    ]
  },
  {
    id: 14,
    title: '你觉得滑雪最大的魅力是？',
    options: [
      { label: 'A', text: '速度与自由，风从耳边呼啸而过', weights: [{ dimensionId: 'A1', score: 2 }, { dimensionId: 'T2', score: 1 }] },
      { label: 'B', text: '和朋友一起的快乐时光', weights: [{ dimensionId: 'S1', score: 2 }, { dimensionId: 'V1', score: 1 }] },
      { label: 'C', text: '被雪山包围的那种治愈感', weights: [{ dimensionId: 'V1', score: 2 }, { dimensionId: 'V2', score: 1 }] }
    ]
  },
  {
    id: 15,
    title: '雪季结束后你通常在干什么？',
    options: [
      { label: 'A', text: '研究下个雪季的装备升级方案', weights: [{ dimensionId: 'E1', score: 1 }, { dimensionId: 'E2', score: 2 }] },
      { label: 'B', text: '剪辑本雪季的高光视频合集', weights: [{ dimensionId: 'S2', score: 2 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'C', text: '该干嘛干嘛，滑雪只是生活的一部分', weights: [{ dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 16,
    title: '你摔了一个大跟头之后？',
    options: [
      { label: 'A', text: '爬起来继续冲，摔是进步的阶梯', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'B', text: '先检查自己有没有受伤', weights: [{ dimensionId: 'A1', score: 0 }] },
      { label: 'C', text: '趁没人看见赶紧站起来假装没事', weights: [{ dimensionId: 'S2', score: 1 }, { dimensionId: 'S1', score: 1 }] }
    ]
  },
  {
    id: 17,
    title: '你在雪场看到初学者摔倒，你的反应是？',
    options: [
      { label: 'A', text: '走过去教他几招，成就感满满', weights: [{ dimensionId: 'S1', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'B', text: '在心里默默鼓励他，但不会上前', weights: [{ dimensionId: 'S1', score: 0 }] },
      { label: 'C', text: '想起了自己当年的惨状，会心一笑', weights: [{ dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 18,
    title: '关于请教练这件事，你怎么看？',
    options: [
      { label: 'A', text: '必须请！系统学习效率最高', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'E1', score: 1 }] },
      { label: 'B', text: '看视频自学就行，省钱', weights: [{ dimensionId: 'T1', score: 1 }, { dimensionId: 'E2', score: 1 }] },
      { label: 'C', text: '教练？不需要，我就是来玩的', weights: [{ dimensionId: 'V1', score: 2 }] }
    ]
  },
  {
    id: 19,
    title: '你最想解锁的滑雪技能是？',
    options: [
      { label: 'A', text: '360 空翻/跳台大招', weights: [{ dimensionId: 'A1', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'B', text: '行云流水的刻滑长弯', weights: [{ dimensionId: 'T2', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'C', text: '能安全刹停就谢天谢地了', weights: [{ dimensionId: 'A1', score: 0 }, { dimensionId: 'T1', score: 0 }] }
    ]
  },
  {
    id: 20,
    title: '你的雪季社交状态是？',
    options: [
      { label: 'A', text: '加了 N 个雪友群，每周组局', weights: [{ dimensionId: 'S1', score: 3 }, { dimensionId: 'S2', score: 1 }] },
      { label: 'B', text: '固定几个好友一起滑', weights: [{ dimensionId: 'S1', score: 1 }] },
      { label: 'C', text: '一个人也能滑得很开心', weights: [{ dimensionId: 'S1', score: 0 }] }
    ]
  },
  {
    id: 21,
    title: '你怎么看待"野雪/树林"？',
    options: [
      { label: 'A', text: '粉雪天堂！为此愿意徒步登山', weights: [{ dimensionId: 'A2', score: 2 }, { dimensionId: 'A1', score: 2 }] },
      { label: 'B', text: '有向导带着可以试试', weights: [{ dimensionId: 'A2', score: 1 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'C', text: '道外？那不是找死吗', weights: [{ dimensionId: 'A1', score: 0 }, { dimensionId: 'A2', score: 0 }] }
    ]
  },
  {
    id: 22,
    title: '你觉得滑雪和拍照哪个更重要？',
    options: [
      { label: 'A', text: '当然是拍照！不发朋友圈等于没去', weights: [{ dimensionId: 'S2', score: 3 }, { dimensionId: 'V2', score: 2 }] },
      { label: 'B', text: '都重要，边滑边拍', weights: [{ dimensionId: 'S2', score: 1 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'C', text: '滑雪！滑都滑不够，哪有时间拍', weights: [{ dimensionId: 'T1', score: 1 }, { dimensionId: 'S2', score: 0 }] }
    ]
  },
  {
    id: 23,
    title: '一个雪季下来，你的滑雪天数大概是？',
    options: [
      { label: 'A', text: '30 天以上，能住在雪场最好', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'A2', score: 1 }] },
      { label: 'B', text: '10-20 天，正常水平', weights: [{ dimensionId: 'T1', score: 1 }] },
      { label: 'C', text: '5 天以内，打个卡就行', weights: [{ dimensionId: 'V1', score: 1 }, { dimensionId: 'V2', score: 1 }] }
    ]
  },
  {
    id: 24,
    title: '你对护具的态度是？',
    options: [
      { label: 'A', text: '头盔+护甲+护臀+护膝全副武装', weights: [{ dimensionId: 'A1', score: 0 }, { dimensionId: 'E1', score: 1 }] },
      { label: 'B', text: '头盔必须有，其他看情况', weights: [{ dimensionId: 'A1', score: 1 }] },
      { label: 'C', text: '护具？不存在的，影响发挥', weights: [{ dimensionId: 'A1', score: 2 }] }
    ]
  },
  {
    id: 25,
    title: '如果用一句话形容你和滑雪的关系？',
    options: [
      { label: 'A', text: '生命不息，送命不止', weights: [{ dimensionId: 'A1', score: 2 }, { dimensionId: 'T1', score: 2 }] },
      { label: 'B', text: '最美不过雪山下的一杯热可可', weights: [{ dimensionId: 'V1', score: 2 }, { dimensionId: 'V2', score: 2 }] },
      { label: 'C', text: '我也不知道为啥来，但下次还来', weights: [{ dimensionId: 'S1', score: 1 }, { dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 26,
    title: '你对"平花"（Ground Tricks）怎么看？',
    options: [
      { label: 'A', text: '超帅！原地黄油、Ollie 是我每次必练项目', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'T2', score: 1 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'B', text: '偶尔摆个 Pose，但主要为了拍帅照', weights: [{ dimensionId: 'S2', score: 2 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'C', text: '平花是啥？我走路都能摔', weights: [{ dimensionId: 'T1', score: 0 }] }
    ]
  },
  {
    id: 27,
    title: '假如让你选一种双板流派，你选？',
    options: [
      { label: 'A', text: '大回转/小回转，追求极致竞速和精准走线', weights: [{ dimensionId: 'T2', score: 3 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'B', text: '双板自由式，Mogul / 跳台都想试', weights: [{ dimensionId: 'A1', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'C', text: '我就犁式刹车选手，能停下来就是胜利', weights: [{ dimensionId: 'A1', score: 0 }, { dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 28,
    title: '滑雪时你手机里最多的 App 是？',
    options: [
      { label: 'A', text: 'Slopes/滑呗，追踪速度、落差、趟数，数据党狂喜', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'E2', score: 1 }] },
      { label: 'B', text: '小红书/抖音，边滑边更新动态', weights: [{ dimensionId: 'S2', score: 2 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'C', text: '天气预报——只关心明天会不会下雪', weights: [{ dimensionId: 'A2', score: 1 }, { dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    id: 29,
    title: '你觉得滑雪受伤这件事？',
    options: [
      { label: 'A', text: '勋章！养好了继续冲，伤疤是滑雪佬的纹身', weights: [{ dimensionId: 'A1', score: 3 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'B', text: '尽量避免，但也不会因此不敢滑', weights: [{ dimensionId: 'A1', score: 1 }] },
      { label: 'C', text: '我已经囤了三年的护膝，安全是底线', weights: [{ dimensionId: 'A1', score: 0 }, { dimensionId: 'E1', score: 1 }] }
    ]
  },
  {
    id: 30,
    title: '你下了缆车站在山顶那一刻的想法是？',
    options: [
      { label: 'A', text: '肾上腺素拉满！哪条道最陡冲哪条', weights: [{ dimensionId: 'A1', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'B', text: '好美啊…先深呼吸拍个全景', weights: [{ dimensionId: 'V1', score: 2 }, { dimensionId: 'S2', score: 1 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'C', text: '天哪好高…我是怎么上来的…能坐缆车下去吗', weights: [{ dimensionId: 'A1', score: 0 }, { dimensionId: 'V1', score: 1 }] }
    ]
  }
]
