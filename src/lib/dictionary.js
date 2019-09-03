const dictionary = {
  from: {
    en_us: 'from',
    pt_br: 'de'
  },
  to: {
    en_us: 'to',
    pt_br: 'por'
  },
  hello: {
    en_us: 'Hello',
    pt_br: 'Olá'
  }
}

export default function (word, lang) {
  if (!lang) {
    lang = (this && this.lang) || 'en_us'
  }
  return (dictionary[word] && dictionary[word][lang]) || ''
}
