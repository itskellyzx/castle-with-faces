let castle

project.importSVG("castle.svg", function (svg) {
  castle = svg.children["castle"]
  castle.selected = true
  castle.fillColor = "pink"

  for (const segment of castle.segments) {
    const circle = new Path.Circle({
      radius: 8,
      center: segment.point,
      fillColor: "black",
    })

    circle.on("mousedrag", function (event) {
      segment.point = event.point
      circle.position = event.point
    })
  }
})

let face1, face2, face3
project.importSVG("face.svg", function (svg) {
  face1 = svg.children["face1"]
  face2 = svg.children["face2"]
  face3 = svg.children["face3"]
  face1.selected = true
  face2.selected = true
  face3.selected = true

  setPosition(face1, 200, 200)
  setPosition(face2, 300, 300)
  setPosition(face3, 400, 400)
})

function setPosition(item, x, y) {
  if (item) {
    item.position = new Point(x, y)
  }
}

// The parameters that we want to change with tweakpane.
const params = {
  file: "",
  color: "rgb(255, 0, 0)",
}

// Create a new tweakpane and redraw the circle each time we change the
// parameters.
const pane = new Pane()
pane.registerPlugin(TweakpaneFileImportPlugin)

// Here we will store our imported SVG.
let importedSVG

pane.addBinding(params, "color")

// Export
pane
  .addButton({
    title: "Export",
  })
  .on("click", function () {
    const svg = project.exportSVG({ asString: true })
    downloadSVGFile("recolored", svg)
  })

pane.on("change", function () {
  // If we have already imported something, we will recolor it every time we
  // change the color in tweakpane.
  if (castle) {
    castle.fillColor = params.color
  }
})
