const dynamicVueSlots = slotsObj => {
  let template = ''
  for (const slotName in slotsObj) {
    const slotHtml = slotsObj[slotName]
    if (slotHtml) {
      template += `<template #${slotName}>${slotHtml}</template>`
    }
  }
  return template
}

export {
  dynamicVueSlots
}
