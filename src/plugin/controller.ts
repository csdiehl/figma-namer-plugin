figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
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
