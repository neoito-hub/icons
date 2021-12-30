figma.showUI(__html__, { width: 300, height: 400 })
if (figma.command === 'generate_icon') {
  figma.ui.postMessage({ type: figma.command })
  let node = figma.currentPage.selection[0];
  node.exportAsync({ format: "SVG" }).then(res => {
    figma.ui.postMessage({ type: figma.command, data: { name: node.name, tags: [node.name], svg: String.fromCharCode.apply(null, res).toString() } })
  }).catch(err => console.error(err));
  // figma.closePlugin();
}
else if (figma.command === 'search_icon') {

}

figma.ui.onmessage = message => {
  const icon = figma.createNodeFromSvg(message.svg)
  icon.name = message.name
  icon.x = figma.viewport.center.x
  icon.y = figma.viewport.center.y
  figma.currentPage.selection = [icon]
  figma.closePlugin()

}
