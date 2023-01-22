// gets the from-point to to-point and draws a line point to point by the specified step (like .01)

const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

class Point {
  constructor(x, y) {
    const { canvasMultiplier } = config.graph

    this.x = x
    this.y = y
    // canvas x and y:
    this.cX = x * canvasMultiplier + canvas.width / 2
    this.cY = -y * canvasMultiplier + canvas.height / 2
  }

  draw = (
    ctx,
    fillColor = config.points.fillColor,
    radius = config.points.radius
  ) => {
    ctx.fillStyle = fillColor
    ctx.beginPath()
    ctx.arc(this.cX, this.cY, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

const { size } = config.canvas
canvas.width = size.width
canvas.height = size.height

let points = []

const { iterations, step, movingSpeed, toggleMove, yFunction } = config.graph

let startingX = config.graph.startingX // in order to change if config.graph.repeating

const drawMainGraph = () => {
  const { canvasMultiplier } = config.graph
  const { gap, thickness, color } = config.mainGraph

  const startingX = -innerWidth / (canvasMultiplier * 2)
  const finishingX = innerWidth / (canvasMultiplier * 2)

  for (let i = startingX; i < finishingX; i += gap) {
    new Point(i, yFunction(i)).draw(ctx, color, thickness)
  }
}

let offSet = 0
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.width)
  config.mainGraph.toggleShow && drawMainGraph()

  for (
    let i = startingX + offSet;
    i <= startingX + offSet + step * iterations;
    i += step
  ) {
    points.push(new Point(i, yFunction(i)))
  }

  config.points.toggleShow &&
    points.forEach(point => {
      point.draw(ctx)
    })

  // Line to next point
  if (config.lines.toggleShow) {
    const { width, color } = config.lines
    ctx.beginPath()

    ctx.moveTo(points[0].cX, points[0].cY)
    for (let i = 0; i < points.length; i++) {
      ctx.lineTo(points[i].cX, points[i].cY)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()
  }

  // Next Step of the animation
  offSet += movingSpeed
  const { repeating, repeatingFromTheBeginingOfTheScreen } = config.graph
  if (repeating && points[0].cX > size.width) {
    offSet = 0
    if (repeatingFromTheBeginingOfTheScreen) {
      startingX = -innerWidth / (canvasMultiplier * 2) - iterations * step
    }
  }
  points = []
  toggleMove && requestAnimationFrame(animate)
}

// APP STARTS HERE
animate()

console.log({ x: innerWidth, y: innerHeight })
const { canvasMultiplier } = config.graph
console.log("From: ", {
  x: new Point(
    -innerWidth / (canvasMultiplier * 2),
    innerHeight / (canvasMultiplier * 2)
  ).cX
})

console.log("to", {
  x: new Point(
    innerWidth / (canvasMultiplier * 2),
    innerHeight / (canvasMultiplier * 2)
  ).cX
})
