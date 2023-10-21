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
    const namesToReplace = {
      'Take action': 'Button',
      'scooter button': 'Elements / Service Tiles',
      'list #1': 'list item',
    };

    figma.skipInvisibleInstanceChildren = true;
    const nodes = figma.currentPage.findAllWithCriteria({
      types: ['INSTANCE'],
    });

    for (let n of nodes) {
      const name = n?.name?.trim();

      if (msg.type === 'replace-labels') {
        if (Object.keys(namesToReplace).includes(name)) {
          console.log(n.componentProperties);
          // n.setProperties({ name: namesToReplace[name] });
          n.name = namesToReplace[name];
          console.log('changed to:', n.name);
          n.setPluginData('status', 'changed');
        }
      }

      if (msg.type === 'undo') {
        const reverseNames = Object.entries(namesToReplace).map(([key, value]) => [value, key]);
        const namesFlipped = Object.fromEntries(reverseNames);

        console.log(namesFlipped);
        if (n.getPluginData('status') === 'changed') {
          n.name = namesFlipped[name];
          n.setPluginData('status', 'original');
        }
      }
    }
  }
};
