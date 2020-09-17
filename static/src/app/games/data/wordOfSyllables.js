const wordOfSyllables = {
  name: 'Слово из слогов',
  types: [
    {
      words: [
        {
          word: 'собака',
          syllable: ['со', 'ба', 'ка'],
          audio: require('../../../assets/audio/wordOfSyllables/dog.mp3'),
          used: false,
        },
        {
          word: 'сорока',
          syllable: ['со', 'ро', 'ка'],
          audio: require('../../../assets/audio/wordOfSyllables/magpie.mp3'),
          used: false,
        },
        {
          word: 'борода',
          syllable: ['бо', 'ро', 'да'],
          audio: require('../../../assets/audio/wordOfSyllables/beard.mp3'),
          used: false,
        },
      ],
      data: [
        'си',
        'са',
        'бу',
        'ко',
        'фа',
        'фу',
        'ку',
        'ло',
        'ми',
        'ро',
        'об',
        'ак',
        'ос',
        'аб',
        'ок',
        'бо',
        'пе',
      ],
    },
  ],
  win: {
    part: 'one',
    refresh: true,
  },
  levels: [
    {
      tasks: 5,
      width: 3,
      height: 3,
    },
    {
      tasks: 7,
      width: 3,
      height: 3,
    },
    {
      tasks: 5,
      width: 4,
      height: 3,
    },
    {
      tasks: 5,
      width: 3,
      height: 3,
    },
    {
      tasks: 5,
      width: 3,
      height: 3,
    },
  ],
  words: [
    {
      type: 0,
      word: 'собака',
      syllable: ['со', 'ба', 'ка'],
      audio: require('../../../assets/audio/wordOfSyllables/dog.mp3'),
      used: false,
    },
    {
      type: 1,
      word: 'морковь',
      syllable: ['мор', 'ковь'],
      audio: require('../../../assets/audio/wordOfSyllables/carrot.mp3'),
      used: false,
    },
    {
      type: 2,
      word: 'котэ',
      syllable: ['ко', 'тэ'],
      audio: require('../../../assets/audio/wordOfSyllables/cat.mp3'),
      used: false,
    },
  ],
  data: [
    'при',
    'вет',
    'ор',
    'со',
    'фа',
    'фу',
    'ку',
    'ло',
    'ми',
    'ро',
    'лаг',
    'дол',
    'яр',
    'ак',
    'мо',
    'хо',
    'по',
  ],

  rulesSound: require('../../../assets/audio/wordOfSyllables/word-of-syllables-rules.mp3'),
}

export default wordOfSyllables
