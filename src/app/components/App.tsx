import React, { useState } from 'react';
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

  // track whether labels have been changed. Make user undo changes before modifying form input
  const [changed, setChanged] = useState(false);

  function formatNameData() {
    // this will handle empty strings. TODO - add stricter form validation
    return {
      'Take action': actionBox.current?.value || defaultNames['Take action'],
      'scooter button': squareBox.current?.value || defaultNames['scooter button'],
      'list #1': homeBox.current?.value || defaultNames['list #1'],
    };
  }

  const onReplace = () => {
    setChanged(true);
    const nameData = formatNameData();
    parent.postMessage({ pluginMessage: { type: 'replace-labels', data: nameData } }, '*');
  };

  const onUndo = () => {
    setChanged(false);

    const nameData = formatNameData();
    console.log(nameData);

    const reverseNames = Object.entries(nameData).map(([key, value]) => [value, key]);
    const namesFlipped = Object.fromEntries(reverseNames);
    parent.postMessage({ pluginMessage: { type: 'undo', data: namesFlipped } }, '*');

    // clear form input
    actionBox.current.value = '';
    squareBox.current.value = '';
    homeBox.current.value = '';
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
      <input
        disabled={changed}
        placeholder={defaultNames['Take action']}
        id="action-input"
        type="text"
        ref={actionBox}
      ></input>
      <label htmlFor="square-input">Square Button:</label>
      <input
        disabled={changed}
        placeholder={defaultNames['scooter button']}
        id="square-input"
        type="text"
        ref={squareBox}
      ></input>
      <label htmlFor="home-input">Home Tile:</label>
      <input disabled={changed} placeholder={defaultNames['list #1']} id="home-input" type="text" ref={homeBox}></input>
      <div style={{ display: 'flex' }}>
        <button
          style={{ backgroundColor: changed ? '#FFF' : '#000', color: changed ? '#000' : '#FFF' }}
          onClick={onReplace}
        >
          Replace Labels
        </button>
        <button
          style={{ backgroundColor: !changed ? '#FFF' : '#000', color: !changed ? '#000' : '#FFF' }}
          onClick={onUndo}
        >
          Undo Changes
        </button>
      </div>
    </div>
  );
}

export default App;
