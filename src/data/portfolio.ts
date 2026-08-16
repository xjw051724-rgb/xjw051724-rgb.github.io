export type CareerExperience = {
  period: string
  company: string
  role: string
  description: string
  logo: string
  logoFit?: 'contain' | 'cover'
}

export type ProjectGroupKey = 'operations' | 'activities'

export type ProjectMetric = {
  label: string
  value: string
  note?: string
}

export type ProjectDetailSection = {
  title: string
  eyebrow: string
  introduction: string
  bullets?: string[]
  metrics?: ProjectMetric[]
  image?: string
  imageAlt?: string
}

export type PortfolioProject = {
  id: string
  kind: 'project'
  group: ProjectGroupKey
  number: string
  type: string
  title: string
  summary: string
  tags: string[]
  cover: string
  coverPosition?: string
  interaction: string
  interactionMode: 'detail' | 'modal'
  showInteractionCta?: boolean
  ctaLabel: '查看详情' | '查看官网' | '查看概念站'
  externalUrl?: string
  detail?: {
    lead: string
    dataDisclosure?: string
    metrics: ProjectMetric[]
    sections: ProjectDetailSection[]
  }
}

export type PortfolioPlaceholder = {
  id: string
  kind: 'placeholder'
  number: string
  label: '待补充'
  description: string
}

export type ProjectGroup = {
  id: ProjectGroupKey
  title: string
  description: string
  items: Array<PortfolioProject | PortfolioPlaceholder>
}

export const careerExperiences: CareerExperience[] = [
  {
    period: '2026.05 - 至今',
    company: '广州虎牙科技',
    role: '游戏联运运营',
    description:
      '负责虎牙游戏板块联运及推广，围绕腾讯游戏预约、首发等关键节点，统筹主播联动、站内资源等推广渠道，并通过活动承接用户转化，推动游戏预约、下载及付费增长。',
    logo: '/images/portfolio/huya-logo.webp',
  },
  {
    period: '2022.10 - 2025.10',
    company: '盛天网络',
    role: '用户增长运营',
    description:
      '负责「随乐游」云游戏平台与「派搭搭」派对社交平台的用户及活动运营，围绕拉新、活跃与留存，通过活动、内容及社区运营持续推动用户增长与产品活跃。',
    logo: '/images/portfolio/shengtian-logo.png',
  },
  {
    period: '2020.06 - 2022.08',
    company: '幸运坐标',
    role: '游戏活动运营',
    description:
      '负责腾讯、网易、西山居等游戏项目的活动与社区运营，覆盖用户拉新、内容营销、活动策划及用户增长，让内容连接用户，让活动创造增长。',
    logo: '/images/portfolio/lucky-coordinates-logo.png',
  },
]

const mengniuWorldcup: PortfolioProject = {
  id: 'mengniu-worldcup',
  kind: 'project',
  group: 'operations',
  number: '01',
  type: '私域增长 · 体育 IP 营销',
  title: '蒙牛低温 × 2026世界杯｜全域私域运营方案',
  summary: '围绕产品物码、世界杯互动、积分兑换和企微承接，搭建从赛事触达到会员沉淀的闭环，让一次节点营销成为可持续运营的品牌资产。',
  tags: ['私域沉淀', '体育IP营销', '全链路裂变', '会员促活'],
  cover: '/images/portfolio/mengniu-worldcup-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/mengniu-worldcup-cover.jpg',
  interactionMode: 'detail',
  ctaLabel: '查看详情',
  detail: {
    lead: '以产品物码、世界杯互动、积分商城与企业微信为四个连续触点，让一次赛事营销不止停在曝光，而是沉淀为可以被反复运营的会员关系。',
    dataDisclosure: '方案指标与交付口径',
    metrics: [
      { label: '用户主路径', value: '扫—玩—兑—加' },
      { label: '品牌互动场', value: '4 个' },
      { label: '赛事运营阶段', value: '3 段' },
      { label: '统一积分规则', value: '1 元 = 10 积分' },
    ],
    sections: [
      {
        eyebrow: '01 / USER JOURNEY',
        title: '扫 - 玩 - 兑 - 加',
        introduction: '从线下产品码和线上内容入口接住流量，在小程序内完成互动、积分、兑换与企微沉淀，让每一次参与都进入可复用的会员链路。',
        bullets: [
          '扫：瓶盖、瓶身码、朋友圈与好友分享进入世界杯主题活动页。',
          '玩：AR 签到、翻牌、点球、老虎机和大转盘降低参与门槛。',
          '兑：通过积分商城兑换周边、奶品与品牌卡券，带动复购和交叉销售。',
          '加：在关键节点引导添加企业微信，承接赛前预热、赛事提醒与 1v1 服务。',
        ],
      },
      {
        eyebrow: '02 / INTERACTION SYSTEM',
        title: '四个品牌互动场',
        introduction: '将子品牌偏好与互动机制绑定，既保留统一的积分资产，也让不同产品的用户获得差异化参与理由。',
        bullets: [
          'AR 扫一扫签到日历：每日扫码获得世界杯卡片与积分，连续 7 天额外奖励。',
          '冠益乳翻牌：每日免费机会叠加分享助力和商城浏览，以卡券、积分、周边承接。',
          '优益 C 点球对战：三次射门按命中数结算积分，用分享海报补充参与机会。',
          '每日鲜酪老虎机与蒙牛大转盘：以轻量抽奖承接扫码、分享和商城浏览。',
        ],
      },
      {
        eyebrow: '03 / REWARD LOOP',
        title: '积分商城兑礼物',
        introduction: '统一积分资产，把活动热度连接到可持续的交易与复购场景。',
        bullets: [
          '高价值、低库存的世界杯周边负责制造稀缺感与传播话题。',
          '按月领取的实体奶品提供稳定的常规会员福利。',
          '品牌满减券可即时兑换并在商城下单时抵扣，形成购物得积分、积分兑卡券、卡券促购物的循环。',
        ],
      },
      {
        eyebrow: '04 / RETENTION',
        title: '企微承接与 Roadmap',
        introduction: '通过赛事前、中、后的三段节奏，把一次活动转化为长期会员生命周期运营。',
        bullets: [
          '蓄水期：搭建主题小程序、承接自然与投放流量，并预埋品牌内容栏目。',
          '爆发期：围绕关键赛事运营主分会场、扫码互动和企微深度触达。',
          '长尾期：发布世界杯旅程回忆、启动会员回馈周，并沉淀多品牌人群与 SOP。',
        ],
      },
    ],
  },
}

const alipayNianBeast: PortfolioProject = {
  id: 'alipay-nian-beast',
  kind: 'project',
  group: 'operations',
  number: '02',
  type: '新春节点 · 国潮互动玩法',
  title: '阿里巴巴｜新春互动玩法创意方案',
  summary: '以国潮年兽为叙事核心，串联轻量互动、集福协作与除夕共战，在春节节点同时完成参与深度、社交传播和品牌年轻化表达。',
  tags: ['新春节点营销', '国潮IP设计', '互动玩法', '社交裂变', '活动运营'],
  cover: '/images/portfolio/alipay-nian-beast-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/alipay-nian-beast-interaction-optimized.jpg',
  interactionMode: 'detail',
  ctaLabel: '查看详情',
  detail: {
    lead: '围绕支付宝集五福“打年兽 添福气”命题，用一个国潮朋克年兽世界观串联集福、轻游戏、社交协作和除夕共战，兼顾热闹感、留存与自传播。',
    dataDisclosure: '方案指标与交付口径',
    metrics: [
      { label: '核心互动玩法', value: '4 类' },
      { label: '社交协作链路', value: '3 条' },
      { label: '传播内容场景', value: '4 组' },
      { label: '全员终局节点', value: '除夕 20:00' },
    ],
    sections: [
      {
        eyebrow: '01 / BRIEF',
        title: '项目挑战',
        introduction: '在全民级新春 IP 中，交互玩法不仅要“热闹”，还要同时完成年轻化包装、参与深度、留存和社交扩散。',
        bullets: [
          '放大集五福 IP 的全民参与度，让用户愿意多次回到活动。',
          '以有记忆点的形象和故事完成春节节点的年轻化表达。',
          '设计可分享、可拉新的机制，并与扫福、领福、换福卡联动。',
        ],
      },
      {
        eyebrow: '02 / WORLD BUILDING',
        title: '国潮朋克世界观',
        introduction: '以橙红、金色和青绿为主色，保留年兽兽角与毛麟记忆点，加入兔耳、机械臂环和轻盔甲，形成既喜庆又带科技感的“淘气年兽”。',
        image: '/images/portfolio/alipay-nian-beast-interaction-optimized.jpg',
        imageAlt: '打年兽添福气玩法交互稿',
      },
      {
        eyebrow: '03 / GAMEPLAY',
        title: '四类互动玩法',
        introduction: '从个人轻操作到双人、多人的协作玩法，再到除夕的全员终局，将参与节奏铺满整个春节周期。',
        bullets: [
          '新春年兽试炼：触屏跑酷，可选择故事或 AR 现实场景寻找年味宝箱。',
          '盟友集结战：双人视频协作，通过头部操作移动、点头发射鞭炮。',
          '热力声波聚集：多人语音驱赶年兽，可随机匹配或邀请好友。',
          '全民嗨动打年兽：除夕限定摇一摇 BOSS 战，按伤害值参与奖池瓜分。',
        ],
      },
      {
        eyebrow: '04 / SOCIAL SPREAD',
        title: '传播话题与裂变',
        introduction: '把玩法过程转化为“年味共鸣、全家福、AR 现世、朋友默契考核”等天然可分享的话题内容。',
        bullets: [
          '分享游戏海报获得额外机会，激励用户把互动扩散到关系链。',
          '自动生成虚拟合照、年味海报和趣味战报，让社交素材从游戏结果里自然长出来。',
          '以“寻年共鸣—相聚情感—新潮玩法”三类内容覆盖不同的情绪触发点。',
        ],
      },
    ],
  },
}

const jx3WinterOlympics: PortfolioProject = {
  id: 'jx3-winter-olympics',
  kind: 'project',
  group: 'activities',
  number: '01',
  type: '内容科普 · 集卡互动',
  title: '剑网3 × 陈露｜冬奥科普集卡联动',
  summary: '将冬奥科普与集卡任务结合，通过每日抽卡、好友赠卡和分段宝箱拉长回访周期，把热点内容转化为可分享、可沉淀的玩家互动。',
  tags: ['用户促活', '社交裂变', '私域沉淀', '热点营销'],
  cover: '/images/portfolio/jx3-winter-olympics-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/jx3-winter-olympics-interaction-optimized.jpg',
  interactionMode: 'detail',
  ctaLabel: '查看详情',
  detail: {
    lead: '用冬奥科普内容作为收集主题，将每日抽卡、好友赠卡和分段宝箱串成 15 天的回访路径；数据以项目总结报告的对外脱敏口径呈现。',
    dataDisclosure: '对外脱敏展示数据',
    metrics: [
      { label: '总参与用户', value: '156,302' },
      { label: '绑定通行证', value: '85,728' },
      { label: '总 PV / UV', value: '1,696,584 / 225,860' },
      { label: '总领奖率', value: '70.92%' },
    ],
    sections: [
      {
        eyebrow: '01 / CONTEXT',
        title: '项目背景',
        introduction: '活动在 2022.01.25 - 2022.02.09 运行 15 天，部署于 QQ 和微信小程序，并结合客户端与新闻轮播图进行资源投放。核心任务是保持春节假期内的玩家黏性，同时引入裂变传播。',
      },
      {
        eyebrow: '02 / GAMEPLAY',
        title: '15 + 1 集卡玩法',
        introduction: '用规则简单、奖励清晰的每日任务降低进入门槛，用卡片稀缺性把用户带回社交关系链。',
        bullets: [
          '可收集 15 张图片卡与 1 张视频卡，收集 1、3、6、10、15 张时分别解锁宝箱。',
          '每天进入可获得一次抽卡机会；每天邀请好友可额外获得一次，当日未使用机会清零。',
          '重复卡可不限次数赠送好友，推动用户在群聊和单人聊天中自然传播。',
        ],
        image: '/images/portfolio/jx3-winter-olympics-interaction-optimized.jpg',
        imageAlt: '剑网3冬奥集卡活动交互稿',
      },
      {
        eyebrow: '03 / DATA',
        title: '核心数据',
        introduction: '在春节档外部环境下，活动累计参与用户为 156,302；玩法机制和奖励表现带来了稳定的中后段活跃与高领奖率。',
        metrics: [
          { label: '总分享用户', value: '105,129' },
          { label: '总助力用户', value: '104,325' },
          { label: '助力后参与转化', value: '41.05%' },
          { label: '新增账号参与', value: '35,982' },
          { label: '全勤抽卡用户', value: '5,850' },
          { label: '人均分享次数', value: '5.5 次' },
        ],
      },
      {
        eyebrow: '04 / RETROSPECTIVE',
        title: '复盘与优化',
        introduction: '奖励更丰厚、规则更简单，使活动在 15 天内保持相对稳定的参与区间；第 2 个宝箱是主要流失点。后续可通过拓展渠道、优化“先助力再参与”路径和迭代主玩法的新鲜感继续提升。',
      },
    ],
  },
}

const honorValueSite: PortfolioProject = {
  id: 'honor-value-site',
  kind: 'project',
  group: 'activities',
  number: '02',
  type: '双端体验 · 信息架构',
  title: '王者向上官网｜双端高保真交互设计',
  summary: '围绕 PC/M 双端信息架构、品牌内容与商务入口，完成高保真原型及交互规范，让官网浏览路径更清晰、信息承接更一致。',
  tags: ['高保真交互', '双端响应', '信息架构', '原型规范'],
  cover: '/images/portfolio/honor-value-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/honor-value-interaction-optimized.jpg',
  interactionMode: 'modal',
  showInteractionCta: true,
  ctaLabel: '查看官网',
  externalUrl: 'https://value.qq.com/index.html',
  detail: {
    lead: '以“找得到、看得懂、能转化”为目标重构双端官网路径，把品牌表达、榜样内容和商务合作入口组织为同一套可扩展的信息架构。',
    dataDisclosure: '交付范围展示',
    metrics: [
      { label: 'PC / M 核心页面', value: '26 页' },
      { label: '高频内容模块', value: '14 组' },
      { label: '组件与状态规范', value: '56 项' },
      { label: '关键用户路径', value: '4 条' },
    ],
    sections: [
      {
        eyebrow: '01 / INFORMATION ARCHITECTURE',
        title: '把品牌叙事拆成清晰的浏览路径',
        introduction: '官网需要同时服务关注项目理念的用户、寻找案例的访客与需要建立合作的机构。方案先按访问意图划分入口，再用统一的内容层级承接品牌故事、人物案例与行动入口，避免信息堆叠造成的阅读中断。',
        bullets: [
          'PC 端以首屏价值表达、项目内容、案例沉淀和合作入口构成连续浏览路径。',
          '移动端优先保留高频信息与转化动作，减少横向信息对小屏阅读的干扰。',
          '为榜单、人物、专题和合作资源预留标准内容模板，保障后续内容扩展的一致性。',
        ],
      },
      {
        eyebrow: '02 / INTERACTION DESIGN',
        title: '用可解释的交互降低浏览成本',
        introduction: '交互不是单独的装饰层，而是服务于页面扫描、信息定位和行动转化。通过卡片悬浮、锚点定位、层级切换和状态反馈，让不同设备上的用户都能快速判断“下一步能做什么”。',
        bullets: [
          '规范首屏、导航、内容卡片、筛选与表单等高频组件的默认、悬停、加载与异常状态。',
          '用响应式断点处理图文比例、内容顺序与操作热区，避免仅缩放 PC 页面带来的体验断裂。',
          '将视觉、交互与开发标注合并为同一套交付说明，降低跨角色沟通成本。',
        ],
        image: '/images/portfolio/honor-value-interaction-optimized.jpg',
        imageAlt: '王者向上官网双端交互稿',
      },
      {
        eyebrow: '03 / DELIVERY VALUE',
        title: '把一次设计交付变成可持续迭代的框架',
        introduction: '最终交付不止是页面原型，还包括双端信息架构、组件状态、内容录入规则与迭代优先级。运营团队可以在同一框架内持续上线新内容，产品和研发也能按统一标准评估成本与风险。',
        metrics: [
          { label: '核心页面覆盖', value: '100%' },
          { label: '组件复用率', value: '76%' },
          { label: '交付返工降低', value: '42%' },
        ],
      },
    ],
  },
}

const suileyouModuleSystem: PortfolioProject = {
  id: 'suileyou-module-system',
  kind: 'project',
  group: 'operations',
  number: '03',
  type: '运营中台 · 模组化配置',
  title: '随乐游｜活动模组化配置体系',
  summary: '将签到、任务、集卡、抽奖等高频玩法沉淀为可配置组件，让运营能够自主组合、灰度和复盘活动，以更短周期支撑稳定交付。',
  tags: ['活动中台', '组件化运营', '降本增效', 'A/B 测试'],
  cover: '/images/portfolio/suileyou-modules-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/suileyou-modules-cover.jpg',
  interactionMode: 'detail',
  ctaLabel: '查看详情',
  detail: {
    lead: '把活动从一次性的项目制交付，转成可以配置、复用、复盘的运营能力：前台玩法保持变化，后台规则、风控和资产发放保持稳定。',
    dataDisclosure: '对外脱敏展示数据',
    metrics: [
      { label: '核心玩法模块', value: '8 类' },
      { label: '系统承接活动', value: '120+ 场 / 2 年' },
      { label: '单活动交付', value: '10–14 天 → 0.5–1 天' },
      { label: '高并发 P0 / P1', value: '0 起' },
    ],
    sections: [
      {
        eyebrow: '01 / PROBLEM',
        title: '把高频需求从“排期”中释放出来',
        introduction: '节庆促活、留存任务、礼包售卖等活动需求高频出现，若每次均从需求评审、开发、测试重新走一遍，不仅成本高，也无法匹配运营节点的时效性。因此将可重复的底层逻辑沉淀为可编排能力。',
        bullets: [
          '目标是让运营可独立完成创建、配置、灰度与复盘，不再把研发投入在重复造轮子上。',
          '优先覆盖签到、任务、集卡、抽奖、特惠等可规模复用的活动骨架。',
          '为后续的节日主题、用户分层和商业化试验预留规则与视觉扩展位。',
        ],
      },
      {
        eyebrow: '02 / SYSTEM DESIGN',
        title: '八类玩法组件 + 一套通用规则层',
        introduction: '将前台视觉、玩法配置与底层逻辑拆开：运营选择玩法与人群规则，系统负责门槛判断、资产发放与风险拦截，保证不同活动之间既能自由组合，又不牺牲一致性。',
        bullets: [
          '组件库覆盖签到、任务、集卡、抽奖、特惠等 8 类核心玩法，支持单体或多模组嵌套。',
          '统一规则引擎承接资产、门槛、频次与防刷逻辑，实现已验证逻辑的通用复用。',
          'UI 插槽化支持主题皮肤替换：同一套活动逻辑，可快速适配新春、暑期、版本庆典等不同内容场景。',
        ],
      },
      {
        eyebrow: '03 / DELIVERY FLOW',
        title: '从配置到上线，缩短为可控的运营闭环',
        introduction: '我将活动策划过程拆成“目标与人群—组件选型—规则配置—预览校验—灰度上线—数据复盘”六步，并把常见规则沉淀成模板，确保效率提升不以体验和稳定性为代价。',
        bullets: [
          '按活动目标选择主玩法与辅助玩法，避免为堆玩法而堆玩法。',
          '上线前在配置端完成奖励库存、资格门槛、频次与异常路径检查。',
          '通过人群分层和多方案并行，快速验证玩法、奖励和入口的转化差异。',
        ],
      },
      {
        eyebrow: '04 / BUSINESS VALUE',
        title: '效率、稳定性与转化同时可衡量',
        introduction: '系统稳定运行两年，累计承接 120+ 场活动。单活动交付从 10–14 天压缩至 0.5–1 天，在高并发活动中保持 P0/P1 为 0；通过更快的方案迭代，核心业务转化率平均提升 28%。',
        metrics: [
          { label: '研发成本节省', value: '85%+' },
          { label: '交付效率提升', value: '90%' },
          { label: '核心 CVR 平均提升', value: '28%' },
        ],
      },
      {
        eyebrow: '05 / ENABLEMENT',
        title: '把经验转成可复制的组织资产',
        introduction: '除了搭建工具，也同步沉淀方法和使用规范。通过《活动模组配置白皮书》、20+ 经典模板与跨团队培训，让不同业务能够在统一标准下自助复刻。',
        bullets: [
          '沉淀节庆、促活、留存等 20+ 经典活动模板，减少从空白页开始的决策成本。',
          '完成 6 场跨团队培训，并向 3 个业务部门输出中台能力。',
          '支撑跨业务线活动 35+ 场，让工具价值从单个项目扩展到组织协作。',
        ],
      },
    ],
  },
}

const cloudGamingBenchmark: PortfolioProject = {
  id: 'cloud-gaming-benchmark',
  kind: 'project',
  group: 'operations',
  number: '04',
  type: '竞品研究 · 体验与运营洞察',
  title: '随乐游｜云游戏平台竞品测评报告',
  summary: '以核心体验、运营策略与辅助功能建立 5 : 3 : 2 评测框架，横评 17 款云游戏平台，为加载体验、社区运营与产品优化提供优先级依据。',
  tags: ['竞品分析', '云游戏体验', '运营策略', '用户洞察'],
  cover: '/images/portfolio/cloud-gaming-report-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/cloud-gaming-report-interaction-optimized.jpg',
  interactionMode: 'detail',
  ctaLabel: '查看详情',
  detail: {
    lead: '以可重复的评测标准看清云游戏平台的能力差异，再把“竞品观察”落到加载体验、资源策略、用户留存和问题治理的具体优先级上。',
    dataDisclosure: '对外脱敏展示数据',
    metrics: [
      { label: '覆盖产品样本', value: '17 款' },
      { label: '评估维度', value: '核心 / 运营 / 辅助' },
      { label: '权重模型', value: '5 : 3 : 2' },
      { label: '随乐游产品加载', value: '9.3 秒 → 4.9 秒' },
    ],
    sections: [
      {
        eyebrow: '01 / RESEARCH FRAMEWORK',
        title: '建立可复用的 5 : 3 : 2 评测框架',
        introduction: '报告不以“功能多少”做单点比较，而是用核心功能、运营侧、辅助功能三类指标并按 5 : 3 : 2 加权，兼顾用户完成一次云游戏体验的完整旅程与平台长期运营能力。',
        bullets: [
          '核心功能：重点游戏启动速度、资源库广度和关键能力覆盖。',
          '运营侧：收费体系、免费体验、社区宣传与运营功能点。',
          '辅助功能：输入、存档、排队、外设、移动端与跨端体验。',
        ],
      },
      {
        eyebrow: '02 / EXPERIENCE',
        title: '把“能玩”拆成用户可感知的体验细节',
        introduction: '在 17 款平台的同类游戏测试中，随乐游进入第一梯队；以《赛博朋克 2077》为例，产品加载由 9.3 秒优化到 4.9 秒，并在具备该游戏的 6 款产品中保持最快。',
        bullets: [
          '将“连接云端—展示 PC 画面—进入游戏主菜单”拆开记录，避免总时长掩盖真正的体验瓶颈。',
          '对排队自动连接、语音提醒、云存档、虚拟按键等功能做横向比对，识别高频体验缺口。',
          '结合不同端的输入环境提出软键盘、按键文案、陀螺仪与账号助手等具体改进方向。',
        ],
      },
      {
        eyebrow: '03 / OPERATIONS',
        title: '从竞品动作反推运营机会',
        introduction: '研究覆盖产品资源、会员定价、免费体验、社区和内容运营。结论不是照搬竞品，而是判断“什么机制能在随乐游的用户与成本结构里持续成立”。',
        bullets: [
          '免费体验需要和新手任务、会员转化及用户生命周期一起设计，而不是单纯增加赠送时长。',
          '社区维护可按玩法、VIP 等级、偏好游戏分群，让 QQ 群从通知渠道转成留存阵地。',
          '直播、共享操控、免账号和账号助手等能力，是降低首次体验门槛并延长在线时长的可行抓手。',
        ],
      },
      {
        eyebrow: '04 / SERVICE INSIGHT',
        title: '用客服问题校验体验优先级',
        introduction: '一季度归集 7,494 条客服问题后，游戏体验、计费、平台功能三类占总问题量的 66.4%。这组数据帮助团队将优化资源优先投向用户感知最强、影响链路最长的环节。',
        metrics: [
          { label: '游戏体验相关', value: '2,408 条' },
          { label: '计费相关', value: '1,747 条' },
          { label: '平台功能相关', value: '822 条' },
        ],
      },
      {
        eyebrow: '05 / OUTPUT',
        title: '让报告成为可执行的优先级清单',
        introduction: '最终交付不仅是一份排名表，更是可落地的优化路线：加载页补充游戏说明、排队到号增加提醒、移动端完善输入辅助、社区采用精细化分群，并持续用季度口径复测验证效果。',
      },
    ],
  },
}

const codeBreakConceptSite: PortfolioProject = {
  id: 'code-break-concept-site',
  kind: 'project',
  group: 'activities',
  number: '03',
  type: '新游首曝 · 概念站运营',
  title: '西山居｜Code B.R.E.A.K. 概念站首曝运营',
  summary: '围绕新游首曝，以概念站串联机甲彩蛋、玩家共研与测试招募，承接内容平台流量并将兴趣用户沉淀为可持续沟通的种子人群。',
  tags: ['新游宣发', '概念站运营', '玩家共研', '获客转化'],
  cover: '/images/portfolio/code-break-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/code-break-interaction-optimized.jpg',
  interactionMode: 'modal',
  showInteractionCta: true,
  ctaLabel: '查看概念站',
  externalUrl: 'https://www.xinhuozg.com/zt/2022/01/01/index/?posid=2',
  detail: {
    lead: '把首曝兴趣沉淀为可触达的种子用户，以概念站承接内容平台热度，并通过世界观彩蛋、共研招募与分层触达推进用户从“看见”到“留下”。',
    dataDisclosure: '对外脱敏展示数据',
    metrics: [
      { label: '首曝全域曝光', value: '248 万+' },
      { label: '概念站访问用户', value: '18.6 万+' },
      { label: '互动任务完成', value: '9.64 万+' },
      { label: '测试招募转化', value: '2.18 万+' },
    ],
    sections: [
      {
        eyebrow: '01 / LAUNCH STRATEGY',
        title: '用概念站把首曝流量沉淀下来',
        introduction: '新游首曝的核心不是一次性制造声量，而是尽早识别对题材、世界观和玩法有兴趣的人群。概念站承担了首曝信息承接、内容探索、线索收集与后续触达四项任务，让不同渠道流量进入同一条可观察的转化链路。',
        bullets: [
          '以世界观主张、机甲视觉与核心悬念构成首屏表达，保证用户进入后能快速理解产品记忆点。',
          '把角色档案、阵营线索和隐藏彩蛋设计为探索任务，延长单次停留并提高内容阅读深度。',
          '将预约、问卷、社群与测试招募统一沉淀到用户标签体系，为后续分层沟通准备可用人群。',
        ],
      },
      {
        eyebrow: '02 / INTERACTION JOURNEY',
        title: '彩蛋探索与共研招募同时发生',
        introduction: '页面以“探索—解锁—表达—报名”为递进流程。用户在发现信息的过程中完成轻量任务，再被引导留下偏好与测试意愿，既不打断内容体验，也让每一步都有可衡量的运营价值。',
        bullets: [
          '彩蛋解锁：将角色、武器与世界观内容拆成可探索单元，提升主动浏览比例。',
          '观点表达：通过阵营选择与玩法偏好收集，获得可用于后续内容分发的人群信号。',
          '共研招募：用限额与优先资格明确行动价值，将兴趣用户转化为可触达的种子名单。',
        ],
        image: '/images/portfolio/code-break-interaction-optimized.jpg',
        imageAlt: 'Code B.R.E.A.K. 概念站交互稿',
      },
      {
        eyebrow: '03 / GROWTH RESULTS',
        title: '从内容热度到测试名单的转化闭环',
        introduction: '通过渠道落地页参数、站内任务事件和表单状态追踪，将首曝传播拆成曝光、访问、探索、留资与招募确认五层漏斗。运营不只关注总访问，也能看到哪些内容和入口真正带来高质量用户。',
        metrics: [
          { label: '访问到互动完成', value: '51.8%' },
          { label: '互动到留资转化', value: '28.6%' },
          { label: '招募名单有效率', value: '83.4%' },
        ],
      },
    ],
  },
}

const newYearFunCampaign: PortfolioProject = {
  id: 'suileyou-new-year-fun',
  kind: 'project',
  group: 'activities',
  number: '04',
  type: '新春节点 · 云游戏促活',
  title: '随乐游｜新年乐翻天',
  summary: '以礼包码、连续签到、集福卡和限时锦包组织春节活动节奏，兼顾低门槛参与、多日回访、社交分享与云游戏业务转化。',
  tags: ['节点营销', '签到促活', '集卡裂变', '礼包转化'],
  cover: '/images/portfolio/new-year-fun-cover-v3-optimized.jpg',
  interaction: '/images/portfolio/new-year-fun-interaction-optimized.jpg',
  interactionMode: 'detail',
  ctaLabel: '查看详情',
  detail: {
    lead: '以“领福利—做任务—集福卡—兑礼包”为递进主线，将节日情绪、云游戏时长与交易动作组织为可回访、可分享、可复盘的增长机制。',
    dataDisclosure: '对外脱敏展示数据',
    metrics: [
      { label: '活动参与用户', value: '186,400', note: '活动周期去重用户' },
      { label: '分享用户 / 分享次数', value: '28,600 / 66,800', note: '站内外分享合并口径' },
      { label: '集卡参与 / 裂变回流', value: '102,400 / 22,400', note: '完成首个任务的回流用户' },
      { label: '集福合成 / 锦包购买', value: '36,600 / 7,480', note: '完成兑换或支付的用户' },
    ],
    sections: [
      {
        eyebrow: '01 / CAMPAIGN GOAL',
        title: '把春节流量转成多日回访',
        introduction: '面对日活约 5 万、月活约 150 万的云游戏平台，春节节点的关键不只是把用户拉到首页，而是让不同活跃度的人群在假期内持续回来。方案以礼包福利完成首触达，用签到、集卡和社交分享拉长周期，再以限时锦包承接高意愿转化。',
        bullets: [
          '用新春礼包码降低首次参与门槛，并设计分享任务扩展站外触达。',
          '用连续签到与分档奖励创造可预期的每日回访理由。',
          '用福卡收集连接任务、互动和奖池，让完成感逐步累积。',
        ],
      },
      {
        eyebrow: '02 / GAMEPLAY',
        title: '四层玩法，覆盖参与到转化',
        introduction: '活动不把所有目标压在一个玩法上，而是由低到高组织用户行为：先领取福利，再完成任务与签到，随后通过集卡和限时商品提升参与深度。',
        bullets: [
          '新春礼包码：作为首页首触点，强化“进来就有收获”的节日感知。',
          '七日签到：按天释放奖励，降低连续参与的心理门槛。',
          '福卡收集：将游戏、浏览、分享等行为转为可见的进度与兑换资格。',
          '瑞龙锦包：以限时礼包承接高意愿用户，形成活动到商业化的自然过渡。',
        ],
        image: '/images/portfolio/new-year-fun-interaction-optimized.jpg',
        imageAlt: '随乐游新年乐翻天活动交互说明',
      },
      {
        eyebrow: '03 / GROWTH FUNNEL',
        title: '分享—裂变—集福合成',
        introduction: '增长链路不只统计“分享按钮被点了多少次”，而是把分享发起、好友回流、集卡参与与最终合成拆开观察。活动期间共有 28,600 名用户主动分享，带来 22,400 名回流用户完成首个集卡任务；102,400 名用户参与集卡，36,600 名用户完成集福合成。',
        metrics: [
          { label: '主动分享用户', value: '28,600' },
          { label: '裂变回流用户', value: '22,400' },
          { label: '集福合成用户', value: '36,600' },
          { label: '人均分享次数', value: '2.34 次' },
          { label: '回流完成首任务', value: '33.5%' },
          { label: '集卡到合成转化', value: '35.7%' },
        ],
      },
      {
        eyebrow: '04 / RESULTS',
        title: '用分层指标验证节点价值',
        introduction: '活动总参与达到 186,400 人，占月活约 12.4%；活动期日均活跃较元旦同类活动提升 28.6%。分享、回流、集卡与合成数据共同证明：福利能带来首次进入，但可见进度、社交协作与分档奖池才是推动多日回访和深度参与的核心。',
        metrics: [
          { label: '同类活动参与提升', value: '+68%' },
          { label: '活动期日均活跃提升', value: '+28.6%' },
          { label: '活动主页峰值访问', value: '48,600' },
          { label: '锦包购买转化', value: '4.01%' },
        ],
      },
      {
        eyebrow: '05 / RETROSPECTIVE',
        title: '用行为漏斗迭代奖励梯度',
        introduction: '数据也提示了持续优化方向：当中间档任务时长超过用户预期，部分用户会在 60–120 分钟环节流失。下一轮将按新老用户、轻重度游戏时长与回流来源优化任务梯度，让奖励价值与用户投入更匹配。',
        bullets: [
          '将长时长任务拆成更多阶段性奖励，增加即时反馈。',
          '避免活动间隔过短导致疲劳，并减少榜单重复获奖带来的挫败感。',
          '保留分享、签到和集卡的有效组合，继续探索节日玩法的新鲜感与复用价值。',
        ],
      },
    ],
  },
}

export const projectGroups: ProjectGroup[] = [
  {
    id: 'operations',
    title: '把增长目标拆成可执行的运营方案',
    description: '围绕用户路径、资源协同与转化机制，形成可验证、可复用的增长解法',
    items: [mengniuWorldcup, alipayNianBeast, suileyouModuleSystem, cloudGamingBenchmark],
  },
  {
    id: 'activities',
    title: '把热点做成用户愿意参与的活动',
    description: '从主题表达、互动路径到回访转化，让每次参与都有清晰的业务落点',
    items: [jx3WinterOlympics, honorValueSite, codeBreakConceptSite, newYearFunCampaign],
  },
]

export const projectById: Record<PortfolioProject['id'], PortfolioProject> = {
  'mengniu-worldcup': mengniuWorldcup,
  'alipay-nian-beast': alipayNianBeast,
  'jx3-winter-olympics': jx3WinterOlympics,
  'honor-value-site': honorValueSite,
  'suileyou-module-system': suileyouModuleSystem,
  'cloud-gaming-benchmark': cloudGamingBenchmark,
  'code-break-concept-site': codeBreakConceptSite,
  'suileyou-new-year-fun': newYearFunCampaign,
}

export function getProjectFromPath(pathname: string): PortfolioProject | undefined {
  return Object.values(projectById).find((project) => pathname === `/projects/${project.id}`)
}
