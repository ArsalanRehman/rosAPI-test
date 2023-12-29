// This function assumes that 'helper' is an object containing the 'calculateCentroid' and 'expandVertex' functions

// Calculate the lengths of all sides of the polygon
function calculateSideLengths(vertices) {
  let sideLengths = []
  for (let i = 0; i < vertices.length; i++) {
    let nextIndex = (i + 1) % vertices.length // To loop back to the first vertex
    let sideLength = Math.hypot(
      vertices[nextIndex][0] - vertices[i][0],
      vertices[nextIndex][1] - vertices[i][1]
    )
    sideLengths.push(sideLength)
  }
  console.log('Side Lengths:', sideLengths) // Debug statement
  return sideLengths
}

// Expand each vertex according to the side length
exports.expandPolygonUniformly = (vertices, expansionSize) => {
  if (!vertices || vertices.length === 0 || !expansionSize) {
    console.error('Invalid vertices or expansionSize:', vertices, expansionSize)
    return vertices // Return the input as a fallback
  }

  let sideLengths = calculateSideLengths(vertices)
  let shortestSide = Math.min(...sideLengths)
  let ratio = sideLengths.map((length) => shortestSide / length)

  let expandedVertices = vertices.map((vertex, index) => {
    let prevIndex = index === 0 ? vertices.length - 1 : index - 1
    let nextIndex = (index + 1) % vertices.length

    // Ensure the ratios are valid numbers
    if (isNaN(ratio[prevIndex]) || isNaN(ratio[nextIndex])) {
      console.error('Invalid ratio for index:', index, 'Ratios:', ratio)
      return vertex // Return the original vertex as a fallback
    }

    let averageRatio = (ratio[prevIndex] + ratio[nextIndex]) / 2
    let adjustedExpansionSize = expansionSize * averageRatio

    // Calculate the centroid for each vertex's expansion
    let centroid = helper.calculateCentroid([
      vertex,
      vertices[prevIndex],
      vertices[nextIndex],
    ])

    // Expand the vertex and ensure it returns valid numbers
    let expandedVertex = helper.expandVertex(
      vertex,
      centroid,
      adjustedExpansionSize
    )
    if (expandedVertex.some((coord) => isNaN(coord))) {
      console.error('Expanded vertex contains NaN:', expandedVertex)
      return vertex // Return the original vertex as a fallback
    }
    return expandedVertex
  })

  console.log('Expanded Vertices:', expandedVertices) // Debug statement
  return expandedVertices
}
