import type { Question } from '@/types'

/**
 * 隐藏题目列表
 *
 * 每道隐藏题通过 hidden.questionId + hidden.optionLabel 触发：
 * 当用户在对应题目选择了对应选项后，该隐藏题出现在那道题下方。
 *
 * ID 从 101 开始，避免与主题目冲突。
 * 隐藏题同样参与评分（weights 计入维度原始分和最大分）。
 */
export const hiddenQuestions: Question[] = [
  {
    // 触发条件：第4题（面对黑道）选A "SEND IT！冲就对了！"
    // 追问：你送命到什么程度？
    id: 101,
    title: '你"冲就完了"之后，一般会发生什么？',
    hidden: { questionId: 4, optionLabel: 'A' },
    options: [
      { label: 'A', text: '完美落地，回头留下一道帅气的雪浪', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'B', text: '翻车了但很快爬起来，假装什么都没发生', weights: [{ dimensionId: 'A1', score: 2 }, { dimensionId: 'S2', score: 1 }] },
      { label: 'C', text: '直接被巡逻队抬下去了…但下次还冲', weights: [{ dimensionId: 'A1', score: 3 }] }
    ]
  },
  {
    // 触发条件：第7题（装备花费）选A "五位数起步"
    // 追问：装备帝深度
    id: 102,
    title: '五位数的装备，你最舍得在哪里砸钱？',
    hidden: { questionId: 7, optionLabel: 'A' },
    options: [
      { label: 'A', text: '板子和固定器，硬件才是核心竞争力', weights: [{ dimensionId: 'E2', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'B', text: '雪服和雪镜，帅才是第一生产力', weights: [{ dimensionId: 'V2', score: 2 }, { dimensionId: 'E1', score: 1 }] },
      { label: 'C', text: '全都要！每个配件都得是顶配', weights: [{ dimensionId: 'E1', score: 3 }] }
    ]
  },
  {
    // 触发条件：第9题（理想目的地）选A "北海道/阿尔卑斯"
    // 追问：追雪行为深度
    id: 103,
    title: '为了追一场粉雪，你最疯狂做过什么？',
    hidden: { questionId: 9, optionLabel: 'A' },
    options: [
      { label: 'A', text: '提前3天看雪报，半夜买机票说走就走', weights: [{ dimensionId: 'A2', score: 3 }, { dimensionId: 'A1', score: 1 }] },
      { label: 'B', text: '雪季规划好几个目的地，有计划地追', weights: [{ dimensionId: 'A2', score: 2 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'C', text: '还没去过，但已经在心里计划了无数次', weights: [{ dimensionId: 'A2', score: 1 }, { dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    // 触发条件：第10题（刻滑态度）选A "刻滑是信仰"
    // 追问：刻滑强迫症
    id: 104,
    title: '你会为了一条完美弧线做到什么程度？',
    hidden: { questionId: 10, optionLabel: 'A' },
    options: [
      { label: 'A', text: '回看每趟视频逐帧分析角刃角度', weights: [{ dimensionId: 'T2', score: 3 }, { dimensionId: 'E2', score: 1 }] },
      { label: 'B', text: '反复刷同一条道，直到雪面上的弧线让我满意', weights: [{ dimensionId: 'T2', score: 2 }, { dimensionId: 'T1', score: 2 }] },
      { label: 'C', text: '拍下弧线痕迹发群里让雪友们鉴赏', weights: [{ dimensionId: 'T2', score: 1 }, { dimensionId: 'S2', score: 2 }] }
    ]
  },
  {
    // 触发条件：第12题（公园跳台）选A "我就是为了跳台来的"
    // 追问：公园崽深度
    id: 105,
    title: '你在公园里最想解锁的动作是？',
    hidden: { questionId: 12, optionLabel: 'A' },
    options: [
      { label: 'A', text: 'Backflip 后空翻，飞起来才有灵魂', weights: [{ dimensionId: 'A1', score: 3 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'B', text: 'Boardslide 上 Rail，地面花活才考验功底', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'T2', score: -1 }] },
      { label: 'C', text: '什么都想试！每天给自己加一个新挑战', weights: [{ dimensionId: 'A1', score: 2 }, { dimensionId: 'A2', score: 1 }] }
    ]
  },
  {
    // 触发条件：第17题（看到初学者摔倒）选A "走过去教他几招"
    // 追问：野生教练深度
    id: 106,
    title: '你教别人滑雪时最常说的一句话是？',
    hidden: { questionId: 17, optionLabel: 'A' },
    options: [
      { label: 'A', text: '"膝盖弯！重心低！别后坐！"——一套标准动作口令', weights: [{ dimensionId: 'T1', score: 2 }, { dimensionId: 'T2', score: 1 }] },
      { label: 'B', text: '"别怕摔！摔几次就会了"——鼓励式教学', weights: [{ dimensionId: 'S1', score: 2 }, { dimensionId: 'V1', score: 1 }] },
      { label: 'C', text: '"你看我这个动作…"——然后自己摔了', weights: [{ dimensionId: 'S1', score: 2 }, { dimensionId: 'A1', score: 1 }] }
    ]
  },
  {
    // 触发条件：第20题（雪季社交）选A "加了N个雪友群"
    // 追问：社牛深度
    id: 107,
    title: '你在雪友群里一般扮演什么角色？',
    hidden: { questionId: 20, optionLabel: 'A' },
    options: [
      { label: 'A', text: '组局担当——每周发约伴帖，拉群建队', weights: [{ dimensionId: 'S1', score: 3 }, { dimensionId: 'V2', score: 1 }] },
      { label: 'B', text: '氛围担当——发段子、表情包、吐槽视频', weights: [{ dimensionId: 'S1', score: 2 }, { dimensionId: 'S2', score: 2 }] },
      { label: 'C', text: '情报担当——实时播报雪况、缆车排队、天气', weights: [{ dimensionId: 'S1', score: 1 }, { dimensionId: 'A2', score: 2 }, { dimensionId: 'E2', score: 1 }] }
    ]
  },
  {
    // 触发条件：第22题（滑雪vs拍照）选A "当然是拍照"
    // 追问：出片侠深度
    id: 108,
    title: '你拍雪场照片时最讲究什么？',
    hidden: { questionId: 22, optionLabel: 'A' },
    options: [
      { label: 'A', text: '光线！黄金时段必须抓住，逆光剪影是天花板', weights: [{ dimensionId: 'S2', score: 3 }, { dimensionId: 'E2', score: 1 }] },
      { label: 'B', text: '动作！抓拍飞雪飘散的瞬间才叫大片', weights: [{ dimensionId: 'S2', score: 2 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'C', text: '穿搭！配色不对的照片不配出现在朋友圈', weights: [{ dimensionId: 'V2', score: 3 }, { dimensionId: 'E1', score: 1 }] }
    ]
  },
  {
    // 触发条件：第1题（到了雪场第一件事）选C "找个咖啡厅坐下来先缓缓"
    // 追问：咸鱼深度
    id: 109,
    title: '在咖啡厅坐下后，你接下来的计划是？',
    hidden: { questionId: 1, optionLabel: 'C' },
    options: [
      { label: 'A', text: '喝完这杯就出发…再等一杯…算了再坐会儿', weights: [{ dimensionId: 'V1', score: 3 }, { dimensionId: 'T1', score: -1 }] },
      { label: 'B', text: '认真观察窗外的雪道，默默给自己加油打气', weights: [{ dimensionId: 'V1', score: 1 }, { dimensionId: 'T1', score: 1 }] },
      { label: 'C', text: '约了朋友一起，先聊着等人到齐', weights: [{ dimensionId: 'S1', score: 2 }, { dimensionId: 'V1', score: 1 }] }
    ]
  },
  {
    // 触发条件：第24题（护具态度）选A "全副武装"
    // 追问：安全员深度
    id: 110,
    title: '你对雪场安全最在意的是什么？',
    hidden: { questionId: 24, optionLabel: 'A' },
    options: [
      { label: 'A', text: '自己的护具要过关——每次出发前逐项检查', weights: [{ dimensionId: 'E1', score: 1 }, { dimensionId: 'E2', score: 2 }] },
      { label: 'B', text: '别人的行为——最怕有人在雪道中间停着不动', weights: [{ dimensionId: 'S1', score: 1 }, { dimensionId: 'A1', score: -1 }] },
      { label: 'C', text: '雪场整体设施——防护网、标识、巡逻队缺一不可', weights: [{ dimensionId: 'A2', score: 1 }, { dimensionId: 'E2', score: 1 }] }
    ]
  }
]
