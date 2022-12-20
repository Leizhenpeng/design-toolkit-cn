import { client, env } from 'kiss-core'
import { io_hook as io } from 'kiss-msg'

// client.showUI(__html__)

if (!env.inMg) {
  client.figma.showUI(__html__, {
    width: 200,
    height: 120
  })
} else {
  client.mg.showUI(__html__, {
    width: 200,
    height: 160
  })
}

io?.send('hook:hello', 'hello from hook')

io?.on('create-rectangles', (count) => {
  const nodes = []
  for (let i = 0; i < count; i++) {
    const rect = client.createRectangle() as any
    rect.x = i * 150
    if (!env.inMg) {
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
      client.figma.currentPage.appendChild(rect)
    } else {
      rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0.5, b: 1, a: 1 } }]
      client.mg.document.currentPage.appendChild(rect)
    }
    nodes.push(rect)
  }
  if (!env.inMg) {
    client.figma.currentPage.selection = nodes as any
  } else {
    client.mg.document.currentPage.selection = nodes as any
  }
  client.viewport.scrollAndZoomIntoView(nodes)
})
io?.on('ui:cancel', () => {
  client.closePlugin()
})
