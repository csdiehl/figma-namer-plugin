figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
  }

  if (msg.type === 'replace-labels' || msg.type === 'undo') {
    const namesToReplace = msg.data;

    figma.skipInvisibleInstanceChildren = true;
    const nodes = figma.currentPage.findAllWithCriteria({
      types: ['INSTANCE'],
    });

    for (let n of nodes) {
      const name = n?.name?.trim();

      if (msg.type === 'replace-labels') {
        if (Object.keys(namesToReplace).includes(name)) {
          n.name = namesToReplace[name];
          n.setPluginData('status', 'changed');
        }
      }

      if (msg.type === 'undo') {
        if (n.getPluginData('status') === 'changed') {
          n.name = namesToReplace[name];
          n.setPluginData('status', 'original');
        }
      }
    }
  }
};
