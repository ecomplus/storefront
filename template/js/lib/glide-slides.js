import $ from './$'
import Glide from '@glidejs/glide'
import { observer } from './lazy-load'

const glides = {}
const $glides = $('.glide')

for (let i = 0; i < $glides.length; i++) {
  const $glide = $glides[i]
  const options = {}
  ;['autoplay', 'perView'].forEach(opt => {
    if ($glide.dataset[opt] !== undefined) {
      const val = parseInt($glide.dataset[opt], 10)
      if (!isNaN(val)) {
        options[opt] = val
      }
    }
  })

  const grid = { Xs: 576, Sm: 768, Md: 992, Lg: 1200 }
  options.breakpoints = {}
  for (const label in grid) {
    const maxSize = grid[label]
    if (maxSize) {
      const perView = $glide.dataset['perView' + label]
      if (perView) {
        options.breakpoints[maxSize] = {
          perView: parseInt(perView, 10)
        }
      }
    }
  }

  const size = $glide.getElementsByClassName('glide__slide').length
  const glide = new Glide($glide, options)
  glide.mount()
  if ($glide.dataset.name) {
    glides[$glide.dataset.name] = glide
  }

  glide.on('run.before', move => {
    const { perView } = glide.settings
    if (perView > 1 && $glide.dataset.pagination !== 'false') {
      const { direction } = move
      let page, newIndex
      switch (direction) {
        case '>':
        case '<':
          page = Math.ceil(glide.index / perView)
          newIndex = page * perView + (direction === '>' ? perView : -perView)
          if (newIndex >= size) {
            newIndex = 0
          } else if (newIndex < 0 || newIndex + perView > size) {
            newIndex = size - perView
          }
          move.direction = '='
          move.steps = newIndex
      }
    }
  })

  glide.on('run', () => {
    if (glide.settings.perView === 1) {
      const $slide = $glide.getElementsByClassName('glide__slide')[glide.index]
      if ($slide) {
        const $imgs = $slide.getElementsByTagName('IMG')
        for (let i = 0; i < $imgs.length; i++) {
          const $img = $imgs[i]
          if ($img.dataset.src && !$img.dataset.loaded) {
            observer.triggerLoad($img)
          }
        }
      }
    }
  })
}

export { glides }
