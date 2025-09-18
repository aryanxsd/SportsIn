import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';

function Chat() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'them',
      content: 'Hi there! Thanks for connecting.',
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'me',
      content: 'Hello! I saw your profile and would love to learn more about your coaching experience.',
      time: '10:31 AM'
    },
    {
      id: 3,
      sender: 'them',
      content: 'Of course! I\'ve been coaching cricket for over 10 years. What specific aspects are you interested in?',
      time: '10:32 AM'
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'me' as const,
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: 'them' as const,
          content: 'Thanks for your message! I\'ll get back to you soon.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col bg-gray-900">
      {/* Chat Header */}
      <div className="bg-gray-800 p-4 flex items-center border-b border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format"
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border border-neon"
          />
          <div className="ml-3">
            <h3 className="text-white font-medium">John Doe</h3>
            <p className="text-sm text-gray-400">Cricket Coach</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === 'me'
                  ? 'bg-neon text-black ml-auto'
                  : 'bg-gray-700 text-white'
              }`}
            >
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' ? 'text-black/70' : 'text-gray-400'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon"
          />
          <button
            type="submit"
            className="bg-neon text-black p-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;