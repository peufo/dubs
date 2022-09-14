interface Dot {
  x: number
  y: number
}

/**
 * return a path of a line with weight and border-radius
 *
 * @param from start of line
 * @param to end of line
 */
function line(from: Dot, to: Dot, W = 100) {
  const X = to.x - from.x
  const Y = to.y - from.y
  const H = (X ** 2 + Y ** 2) ** 0.5
  const WX = Math.round(((Y * W) / H / 2) * 1000) / 1000
  const WY = Math.round(((X * W) / H / 2) * 1000) / 1000
  let paths = [
    `M${from.x + WX} ${from.y - WY}`,
    `c${1.25 * -WY} ${1.25 * -WX}`,
    `${-2 * WX - 1.25 * WY} ${2 * WY - 1.25 * WX}`,
    `${-2 * WX} ${2 * WY}`,
    `L${to.x - WX} ${to.y + WY}`,
    `c${1.25 * WY} ${1.25 * WX}`,
    `${2 * WX + 1.25 * WY} ${-2 * WY + 1.25 * WX}`,
    `${2 * WX} ${-2 * WY}`,
    'z',
  ]
  return paths.join(' ')
}

const viewWidth = 1000
const viewHeight = 1000
const center = { x: viewWidth / 2, y: viewHeight / 2 }
const angles = [0, 60, 120, 180, 240, 300]
const RAYON = 450

const dots = angles.map((angle) => {
  const radians = (angle / 360) * Math.PI * 2
  let x = center.x + Math.cos(radians) * RAYON
  let y = center.y - Math.sin(radians) * RAYON
  return {
    x: Math.round(x * 1000) / 1000,
    y: Math.round(y * 1000) / 1000,
  }
})

const menuY = [2 * (viewHeight / 5), viewHeight / 2, 3 * (viewHeight / 5)]
const menuX = [
  viewWidth / 4,
  viewWidth / 3,
  2 * (viewWidth / 3),
  3 * (viewWidth / 4),
]
const menu = [
  line({ x: menuX[1], y: menuY[0] }, { x: menuX[2], y: menuY[0] }, 50),
  line({ x: menuX[0], y: menuY[1] }, { x: menuX[3], y: menuY[1] }, 50),
  line({ x: menuX[1], y: menuY[2] }, { x: menuX[2], y: menuY[2] }, 50),
]

export const hexagonMenu = {
  d: [
    line(dots[0], dots[1]),
    line(dots[1], dots[2]),
    line(dots[2], dots[3]),
    line(dots[3], dots[4]),
    line(dots[4], dots[5]),
    line(dots[5], dots[0]),
    ...menu,
  ].join(''),
  viewHeight,
  viewWidth,
}
