import { useState } from 'react';
import { BsFillChatFill } from 'react-icons/bs';

function ChatWidget({ onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you?', sender: 'bot' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { text: input, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { text: data.reply, sender: 'bot' }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { text: 'Error connecting to chatbot.', sender: 'bot' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 80,
      right: 40,
      width: 350,
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
      borderRadius: 12,
      background: '#fff',
      zIndex: 1001,
      transition: 'opacity 0.3s'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#007bff', color: '#fff', padding: 14, borderTopLeftRadius: 12, borderTopRightRadius: 12
      }}>
        <BsFillChatFill size={22} style={{ marginRight: 8 }} />
        <span style={{ fontWeight: 'bold', flex: 1 }}>Chatbot</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}>
          ×
        </button>
      </div>

      <div style={{ height: 250, overflowY: 'auto', padding: 16 }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right', margin: '10px 0' }}>
            <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text}
          </p>
        ))}
        {loading && <p>Bot is typing...</p>}
      </div>

      <div style={{ display: 'flex', borderTop: '1px solid #eee', padding: 12 }}>
        <input
          type="text"
          value={input}
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          placeholder="Type a message..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', marginLeft: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Bubble Icon */}
      <div
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          background: '#007bff',
          color: '#fff',
          borderRadius: '50%',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.20)'
        }}
        onClick={() => setIsOpen(true)}
        title="Chat with us"
      >
        <BsFillChatFill size={28} />
      </div>

      {/* Popup Chat Window */}
      {isOpen && <ChatWidget onClose={() => setIsOpen(false)} />}
    </>
  );
}
