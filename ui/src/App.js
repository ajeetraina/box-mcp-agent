import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { text: '👋 Welcome! Click "Analyze READMEs" to start analyzing compose-for-agents demos!', isUser: false, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim() || loading) return;

    const userMessage = { text: message, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/chat', { message });
      const botMessage = { 
        text: response.data.response, 
        isUser: false, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        text: `❌ Error: ${error.message}`, 
        isUser: false, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: '🔍 Analyze READMEs', message: 'analyze readme' },
    { label: '📋 Status', message: 'status' },
    { label: '❓ Help', message: 'help' }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>📊 README Analyzer Agent</h1>
        <p>Analyze compose-for-agents demos and upload to Box</p>
      </header>

      <div className="quick-actions">
        {quickActions.map((action, index) => (
          <button 
            key={index}
            onClick={() => sendMessage(action.message)}
            className="quick-btn"
            disabled={loading}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            <div className="message-content">
              {msg.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div className="message-time">
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="message-content">🤔 Thinking...</div>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask me to analyze README files..."
          disabled={loading}
        />
        <button 
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
