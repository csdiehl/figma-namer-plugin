import React, { useState } from 'react';
import '../styles/ui.css';

function App() {
  const squareBox = React.useRef<HTMLInputElement>(undefined);
  const actionBox = React.useRef<HTMLInputElement>(undefined);
  const homeBox = React.useRef<HTMLInputElement>(undefined);

  const [error, setError] = useState(false);

  const onReplace = () => {
    const nameData = {
      'Take action': actionBox.current.value,
      'scooter button': squareBox.current.value,
      'list #1': homeBox.current.value,
    };
    console.log(nameData);
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
      <input id="action-input" type="text" ref={actionBox}></input>
      <label htmlFor="square-input">Square Button:</label>
      <input id="square-input" type="text" ref={squareBox}></input>
      <label htmlFor="home-input">Home Tile:</label>
      <input id="home-input" type="text" ref={homeBox}></input>
      <div style={{ display: 'flex' }}>
        <button onClick={onReplace}>Replace Labels</button>
        <button onClick={onUndo}>Undo Changes</button>
      </div>
    </div>
  );
}

export default App;
