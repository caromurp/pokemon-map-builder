/*eslint-env browser */
/*globals $ */

// Default size of map (in tiles)
const DEFAULT_WIDTH = 30
const DEFAULT_HEIGHT = 15

/**
 * @param {object} $container jQuery node to inject map into
 * @param {{ width?: number, height?: number }} params
 */
class MapBuilder {
  // TODO: Initialize MapBuilder parameters
  constructor($container, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
    this.$elem = $container
    this.width = width
    this.height = height
  }

  // TODO: Implement MapBuilder.setupPalette()
  setupPalette = () => {
    let currentSwatch = $('.selected')
    $('.swatch').click(() => {
      $('li').removeClass('selected')
      $(this).addClass('selected')
      currentSwatch = $(this)
      this.currentSwatch = $(this)
    })
  }

  // TODO: Implement MapBuilder.setupMapCanvas
  setupMapCanvas = () => {
    let isMouseDown = false
    for (let i = 0; i < this.height; i++) {
      const $newDiv = $('<div>')
      $newDiv.addClass('row')
      $('.map').append($newDiv)
      for (let j = 0; j < this.width; j++) {
        const $swatchDiv = $('<div>')
        $swatchDiv.addClass('tile swatch grass')
        const firstClass = $swatchDiv.get(0)
        const firstClassList = firstClass.classList
        $swatchDiv.data('prev', firstClassList)
        $swatchDiv.mouseenter(({ target }) => {
          const thisClass = $swatchDiv.get(0)
          const thisClassList = thisClass.classList
          const currentSwatch = $('.selected')
          const currentClass = currentSwatch.get(0)
          const currentClassList = currentClass.classList
          $swatchDiv.removeClass(thisClassList)
          if (thisClassList[3]) {
            $swatchDiv.data('prev', thisClassList[3])
          } else {
            $swatchDiv.data('prev', thisClassList[2])
          }
          $swatchDiv.addClass(`tile swatch ${currentClassList[1]}`)
        })
        $swatchDiv.mousedown(({ target }) => {
          isMouseDown = true
          const thisClass = $swatchDiv.get(0)
          const thisClassList = thisClass.classList
          const currentSwatch = $('.selected')
          const currentClass = currentSwatch.get(0)
          const currentClassList = currentClass.classList
          $swatchDiv.removeClass(thisClassList)
          $swatchDiv.data('prev', currentClassList[1])
          $swatchDiv.addClass('tile swatch ' + currentClassList[1])
        })
        $swatchDiv.mouseup(({ target }) => {
          isMouseDown = false
        })
        $swatchDiv.mouseout(({ target }) => {
          if (!isMouseDown) {
            const currentSwatch = $('.selected')
            const currentClass = currentSwatch.get(0)
            const currentClassList = currentClass.classList
            $swatchDiv.removeClass(currentClassList[1])
            $swatchDiv.addClass($swatchDiv.data('prev'))
          }
        })
        $newDiv.append($swatchDiv)
      }
    }
  }
}
