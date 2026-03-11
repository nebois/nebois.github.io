export interface FortuneQuestion {
  id: string
  title: string
  type: 'personality' | 'love' | 'career' | 'fortune' | 'fun'
  questions: {
    id: number
    text: string
    options: {
      text: string
      scores: Record<string, number>
    }[]
  }[]
  results: {
    id: string
    title: string
    description: string
    minScore: number
    maxScore: number
  }[]
}

export const fortuneTests: FortuneQuestion[] = [
  {
    id: 'personality',
    title: '性格测试',
    type: 'personality',
    questions: [
      {
        id: 1,
        text: '在社交场合中，你通常是怎样的？',
        options: [
          { text: '主动与人交谈', scores: { E: 3, I: 0 } },
          { text: '等待别人主动", scores: { I: 3, E: 0 } },
          { text: '看情况', scores: { E: 1, I: 1 } },
        ],
      },
      {
        id: 2,
        text: '你更喜欢哪种工作方式？',
        options: [
          { text: '团队合作', scores: { E: 3, I: 0 } },
          { text: '独立完成', scores: { I: 3, E: 0 } },
          { text: '两者结合', scores: { E: 1, I: 1 } },
        ],
      },
      {
        id: 3,
        text: '面对新问题时，你会？',
        options: [
          { text: '立即尝试解决', scores: { S: 0, N: 3 } },
          { text: '先仔细分析', scores: { N: 3, S: 0 } },
          { text: '寻求帮助", scores: { S: 1, N: 1 } },
        ],
      },
      {
        id: 4,
        text: '你更注重？',
        options: [
          { text: '事实和细节', scores: { S: 3, N: 0 } },
          { text: '可能性和想象", scores: { N: 3, S: 0 } },
          { text: '平衡两者", scores: { S: 1, N: 1 } },
        ],
      },
      {
        id: 5,
        text: '做决定时，你更依赖？',
        options: [
          { text: '逻辑和分析', scores: { T: 3, F: 0 } },
          { text: '感情和价值观", scores: { F: 3, T: 0 } },
          { text: '两者兼顾", scores: { T: 1, F: 1 } },
        ],
      },
    ],
    results: [
      {
        id: 'istj',
        title: '物流师型 (ISTJ)',
        description: '你是一个安静、专注且负责的人。你注重细节，擅长组织和管理事务，喜欢按计划行事。',
        minScore: 0,
        maxScore: 4,
      },
      {
        id: 'infp',
        title: '调停者型 (INFP)',
        description: '你是一个理想主义者，富有创造力和同情心。你注重内在价值观，喜欢寻找生活的意义。',
        minScore: 5,
        maxScore: 9,
      },
      {
        id: 'entj',
        title: '指挥官型 (ENTJ)',
        description: '你是一个天生的领导者，果断、有竞争力。你善于制定计划并驱动执行，喜欢挑战。',
        minScore: 10,
        maxScore: 15,
      },
    ],
  },
  {
    id: 'love',
    title: '爱情运势',
    type: 'love',
    questions: [
      {
        id: 1,
        text: '你对理想伴侣最看重什么？',
        options: [
          { text: '外表和气质', scores: { A: 3, B: 0 } },
          { text: '内在品质", scores: { B: 3, A: 0 } },
          { text: '相互理解", scores: { A: 1, B: 1 } },
        ],
      },
      {
        id: 2,
        text: '在爱情中你更倾向？',
        options: [
          { text: '主动追求', scores: { A: 3, B: 0 } },
          { text: '等待被追", scores: { B: 3, A: 0 } },
          { text: '顺其自然", scores: { A: 1, B: 1 } },
        ],
      },
    ],
    results: [
      {
        id: 'sweet',
        title: '甜蜜期',
        description: '你的爱情运势正处于甜蜜期！有机会遇到理想的伴侣，的感情发展顺利。',
        minScore: 0,
        maxScore: 3,
      },
      {
        id: 'stable',
        title: '稳定期',
        description: '你的感情生活趋于稳定，与伴侣关系更加深厚。',
        minScore: 4,
        maxScore: 6,
      },
    ],
  },
  {
    id: 'fortune',
    title: '今日运势',
    type: 'fortune',
    questions: [
      {
        id: 1,
        text: '今天早上醒来时的心情是？',
        options: [
          { text: '充满活力', scores: { luck: 3 } },
          { text: '平静如水", scores: { luck: 2 } },
          { text: '有些疲惫", scores: { luck: 1 } },
        ],
      },
      {
        id: 2,
        text: '你相信命运吗？',
        options: [
          { text: '完全相信", scores: { luck: 3 } },
          { text: '半信半疑", scores: { luck: 2 } },
          { text: '不相信", scores: { luck: 1 } },
        ],
      },
    ],
    results: [
      {
        id: 'great',
        title: '大吉',
        description: '今天是你的幸运日！做任何事情都可能有意外的惊喜和收获。',
        minScore: 0,
        maxScore: 3,
      },
      {
        id: 'good',
        title: '吉',
        description: '今天的运气不错，适合尝试新事物或做重要的决定。',
        minScore: 4,
        maxScore: 5,
      },
      {
        id: 'normal',
        title: '平',
        description: '今天是普通的一天，保持平常心，做好眼前的事情就好。',
        minScore: 6,
        maxScore: 8,
      },
    ],
  },
]

export function getTestById(id: string): FortuneQuestion | undefined {
  return fortuneTests.find(test => test.id === id)
}

export function getTestsByType(type: string): FortuneQuestion[] {
  return fortuneTests.filter(test => test.type === type)
}
