function getBreadCrumps(pathParts) {
  return pathParts.map((pathPart, i) => {
    if (i === 0) {
      return { label: 'home', path: '/' }
    }

    if (i === 1) {
      return { label: pathPart, path: `/${pathPart}` }
    }
    
    let prePath = ''

    for (let j = 0; j < i; j++) {
      prePath += pathParts[j]
    }

    const path = `${prePath}/${pathPart}`
    return { label: pathPart, path }
  })
}

function drawBreadCrumps(breadCrumps, breadCrumpsContainer) {
  for (const breadCrump of breadCrumps) {
    const breadCrumpElement = document.createElement('a')
    breadCrumpElement.className = 'breadcrump'
    breadCrumpElement.text = breadCrump.label
    breadCrumpElement.href = breadCrump.path
    breadCrumpsContainer.append(breadCrumpElement)
  }
}

function makeBreadCrumps() {
  const breadCrumpsContainer = document.querySelector('.breadcrumps')

  if (!breadCrumpsContainer) {
    return
  }

  const [, ...pathParts] = location.pathname.split('/')
  const fullPathParts = ['/', ...pathParts]
  const breadCrumps = getBreadCrumps(fullPathParts)

  drawBreadCrumps(breadCrumps, breadCrumpsContainer)
}

makeBreadCrumps()
