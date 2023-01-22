const config = {
  canvas: {
    size: {
      width: innerWidth,
      height: innerHeight
    }
  },
  graph: {
    canvasMultiplier: 50,
    startingX: -20,
    iterations: 100, // how many points after x
    step: 0.3, // x Difference between a point and the next one
    movingSpeed: 0.05,
    yFunction: x => x * Math.sin(x),
    toggleMove: true,
    repeating: true, // once gets out of range it repeats
    repeatingFromTheBeginingOfTheScreen: true // if false then it restarts from where it began (if repeating is true) else it starts from the begining of the screen
  },
  points: {
    toggleShow: true,
    fillColor: "blue",
    radius: 4
  },
  lines: {
    toggleShow: true,
    color: "black",
    width: 3
  },
  mainGraph: {
    toggleShow: false,
    gap: 0.01,
    color: "hsl(0, 0%, 80%, .3)",
    thickness: 3
  }
}
