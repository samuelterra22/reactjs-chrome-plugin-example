import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { ChromeMessage, Sender } from './types';

import { getCurrentTabUId, getCurrentTabUrl } from './chrome/utils';

import './App.css';

const App = (): JSX.Element => {
  const [url, setUrl] = useState<string>('');
  const [responseFromContent, setResponseFromContent] = useState<string>('');

  /**
   * Get current URL
   */
  useEffect(() => {
    getCurrentTabUrl(tabUrl => {
      setUrl(tabUrl || 'undefined');
    });
  }, []);

  const sendTestMessage = (): void => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'Hello from React',
    };

    getCurrentTabUId(id => {
      id &&
        chrome.tabs.sendMessage(id, message, responseFromContentScript => {
          setResponseFromContent(responseFromContentScript);
        });
    });
  };

  const sendRemoveMessage = (): void => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'delete logo',
    };

    getCurrentTabUId(id => {
      id &&
        chrome.tabs.sendMessage(id, message, response => {
          setResponseFromContent(response);
        });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>URL:</p>
        <p>{url}</p>
        <button type="button" onClick={sendTestMessage}>
          SEND MESSAGE
        </button>
        <button type="button" onClick={sendRemoveMessage}>
          Remove logo
        </button>
        <p>Response from content:</p>
        <p>{responseFromContent}</p>
      </header>
    </div>
  );
};

export default App;
