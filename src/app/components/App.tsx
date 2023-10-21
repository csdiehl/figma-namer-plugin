import React from 'react';
import '../styles/ui.css';

function App() {
  const textbox = React.useRef<HTMLInputElement>(undefined);

  const onReplace = () => {
    parent.postMessage({ pluginMessage: { type: 'replace-labels' } }, '*');
  };

  const onUndo = () => {
    parent.postMessage({ pluginMessage: { type: 'undo' } }, '*');
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <h2>Rename your labels</h2>
      <label htmlFor="action-input">Action Button:</label>
      <input id="action-input" type="text" ref={textbox}></input>
      <label htmlFor="square-input">Square Button:</label>
      <input id="square-input" type="text" ref={textbox}></input>
      <div style={{ display: 'flex' }}>
        <button onClick={onReplace}>Replace Labels</button>
        <button onClick={onUndo}>Undo Changes</button>
      </div>
    </div>
  );
}

export default App;
