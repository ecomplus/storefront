import creditCardType from 'credit-card-type'

creditCardType.addCard({
  niceType: 'Hipercard',
  type: 'hipercard',
  patterns: [
    606282
  ],
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: 'CVV',
    size: 3
  }
})
