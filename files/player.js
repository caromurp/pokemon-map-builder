/* eslint-env browser */
/* globals $ */

// The size of a swatch (in pixels)
const SWATCH_SIZE = 25

// Utility function - checks if a given swatch name is walkable terrain.
const isTerrain = (swatchType) =>
  [
    'grass',
    'flowers-red',
    'flowers-orange',
    'flowers-blue',
    'weed',
    'weed-4x',
    'weed-small',
    'weed-2x',
    'field',
    'sand-patch',
    'sand',
    'sand-nw',
    'sand-n',
    'sand-ne',
    'sand-w',
    'sand-e',
    'sand-sw',
    'sand-s',
    'sand-se',
    'sand-nw-inverse',
    'sand-ne-inverse',
    'sand-sw-inverse',
    'sand-se-inverse',
  ].indexOf(swatchType) >= 0

/**
 * Constructor for the player (Pikachu sprite).
 *
 * @param {number}     x       The beginning x coordinate (usually zero)
 * @param {number}     y       The beginning y coordinate (usually zero)
 * @param {MapBuilder} builder The MapBuilder object, with information about the map.
 *                             In particular, this builder object should have the container
 *                             element as a property so the'.map' div can be found using a
 *                             jQuery'find' call.
 */
class Player {
  constructor(x, y, builder) {
    this.builder = builder
    this.$map = builder.$elem.find('.map')

    /**
     * TODO: Initialize the player class. You'll need to
     * 1. Create an element for the player and add it to the DOM, with a class
     *    specifying orientation. The classes are'facing-{up, down, left, right}.'
     * 2. Listen to *keydown* events *on the document* to move the player.
     *    Keycodes for [left, up, right, down] are [37, 38, 39, 40], respectively.
     * 3. Change the player position and orientation based on key presses.
     *
     * You are highly encouraged to implement helper methods. See the class
     * website for more details.
     */

    // create a div for the player
    let $playerDiv = $('<div>')
    $playerDiv.addClass('player facing-down')
    $playerDiv.css({
      top: y * SWATCH_SIZE + 'px',
      left: x * SWATCH_SIZE + 'px',
    })

    // append playerDiv to map and add keydown functionality
    this.$map.append($playerDiv)
    $(document).on('keydown', (e) => {
      this.setOrientation(e, x, y, $playerDiv)
      ;[x, y] = this.ifValidMove(e, x, y, $playerDiv, this.$map)
      $playerDiv.css({
        top: y * SWATCH_SIZE + 'px',
        left: x * SWATCH_SIZE + 'px',
      })
    })
  }

  // changes the orientation of the player
  setOrientation = (e, x, y, $playerDiv) => {
    if (e.which === 37) {
      $playerDiv.removeClass($playerDiv.get(0).classList[1])
      $playerDiv.addClass('facing-left')
    } else if (e.which === 38) {
      $playerDiv.removeClass($playerDiv.get(0).classList[1])
      $playerDiv.addClass('facing-up')
    } else if (e.which === 39) {
      $playerDiv.removeClass($playerDiv.get(0).classList[1])
      $playerDiv.addClass('facing-right')
    } else if (e.which === 40) {
      $playerDiv.removeClass($playerDiv.get(0).classList[1])
      $playerDiv.addClass('facing-down')
    }
  }

  // checks if move is valid
  // for each direction keydown:
  // first checks if player will move off map
  // then checks if swatch is terrain
  ifValidMove = (e, x, y, $playerDiv, $map) => {
    let newX = x
    let newY = y
    if (e.which === 37) {
      console.log('hey')
      if (x > 0) {
        let $row = $map.find($('.row')).eq(y)
        let $swatch = $row
          .find($('.swatch'))
          .eq(x - 1)
          .get(0).classList[3]
        if ($swatch && isTerrain($swatch)) {
          newX -= 1
        } else if (
          !$swatch &&
          isTerrain(
            $row
              .find($('.swatch'))
              .eq(x - 1)
              .get(0).classList[2]
          )
        ) {
          newX -= 1
        }
      }
    } else if (e.which === 38) {
      if (y > 0) {
        let $row = $map.find($('.row')).eq(y - 1)
        let $swatch = $row.find($('.swatch')).eq(x).get(0).classList[3]
        if ($swatch && isTerrain($swatch)) {
          newY -= 1
        } else if (
          !$swatch &&
          isTerrain(
            $row
              .find($('.swatch'))
              .eq(x - 1)
              .get(0).classList[2]
          )
        ) {
          newY -= 1
        }
      }
    } else if (e.which === 39) {
      if (x < this.builder.width - 1) {
        let $row = $map.find($('.row')).eq(y)
        let $swatch = $row
          .find($('.swatch'))
          .eq(x + 1)
          .get(0).classList[3]
        if ($swatch && isTerrain($swatch)) {
          newX += 1
        } else if (
          !$swatch &&
          isTerrain(
            $row
              .find($('.swatch'))
              .eq(x + 1)
              .get(0).classList[2]
          )
        ) {
          newX += 1
        }
      }
    } else if (e.which === 40) {
      if (y < this.builder.height - 1) {
        let $row = $map.find($('.row')).eq(y + 1)
        let $swatch = $row.find($('.swatch')).eq(x).get(0).classList[3]
        if ($swatch && isTerrain($swatch)) {
          newY += 1
        } else if (
          !$swatch &&
          isTerrain($row.find($('.swatch')).eq(x).get(0).classList[2])
        ) {
          newY += 1
        }
      }
    }
    return [newX, newY]
  }
}
