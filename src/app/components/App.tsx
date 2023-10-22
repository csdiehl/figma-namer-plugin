import React from 'react';
import '../styles/ui.css';

const defaultNames = {
  'Take action': 'Button',
  'scooter button': 'Elements / Service Tiles',
  'list #1': 'list item',
};

function App() {
  const squareBox = React.useRef<HTMLInputElement>(undefined);
  const actionBox = React.useRef<HTMLInputElement>(undefined);
  const homeBox = React.useRef<HTMLInputElement>(undefined);

  function formatNameData() {
    return {
      'Take action': actionBox.current?.value || defaultNames['Take action'],
      'scooter button': squareBox.current?.value || defaultNames['scooter button'],
      'list #1': homeBox.current?.value || defaultNames['list #1'],
    };
  }

  const onReplace = () => {
    const nameData = {
      'Take action': actionBox.current?.value || defaultNames['Take action'],
      'scooter button': squareBox.current?.value || defaultNames['scooter button'],
      'list #1': homeBox.current?.value || defaultNames['list #1'],
    };
    console.log(nameData);
    parent.postMessage({ pluginMessage: { type: 'replace-labels', data: nameData } }, '*');
  };

  const onUndo = () => {
    const nameData = {
      'Take action': actionBox.current?.value || 'Button',
      'scooter button': squareBox.current?.value || 'Elements / Service Tiles',
      'list #1': homeBox.current?.value || 'list item',
    };
    const reverseNames = Object.entries(nameData).map(([key, value]) => [value, key]);
    const namesFlipped = Object.fromEntries(reverseNames);
    parent.postMessage({ pluginMessage: { type: 'undo', data: namesFlipped } }, '*');
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
