import { numberToText } from './textToNumber'

// calcula a % usando a média de avaliacoes / total de avaliacoes do produto
export function getWidth(reviews, rating) {
  if (reviews.total === 0) return '0%'

  return `${(
    (100 * reviews.average[numberToText(rating)]) /
    reviews.total
  ).toFixed()}%`
}
