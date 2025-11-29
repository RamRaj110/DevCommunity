import  { useEffect, useRef, } from "react"; 
import { createSocketConnection } from "../utils/socket";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {

    const {id:targetUserId}=useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
      const user = useSelector((state) => state.userInfo.userInfo);
    const userId = user ? user?._id : null;
    console.log("firstName",user.firstName);
 
  const messagesEndRef = useRef(null);

    useEffect(() => {
        if(!userId || !targetUserId) return;
        const socket =  createSocketConnection()
        socket.emit('joinChat',{ firstName:user.firstName,userId, targetUserId  });

        return () => {
            socket.disconnect();
        };
    }, [ userId, targetUserId ]);

// Handle Sending Message
  const handleSendMessage = (e) => {
    e.preventDefault();

    const socket =  createSocketConnection()

    socket.emit('sendMessage', {
        firstName: user.firstName,
        userId,
        targetUserId,
        text: newMessage,
    });
    
  }

  const displayUser =  {
      firstName: "Mira",
      lastName: "Murati",
      profileImg: "https://upload.wikimedia.org/wikipedia/commons/5/56/Mira_Murati_2023.jpg",
      status: "Online"
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden mt-10">
      
      <div className="bg-slate-950/80 p-4 border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700">
                    <img src={displayUser.profileImg} alt="user" className="w-full h-full object-cover" />
                </div>
                {/* Online Status Dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">{displayUser.firstName} {displayUser.lastName}</h3>
                <p className="text-xs text-blue-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                    Online
                </p>
            </div>
        </div>
        
        {/* Header Actions */}
        <button className="btn btn-ghost btn-circle text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
        </button>
      </div>

      {/* --- Messages Area --- */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/30">
        {messages.map((msg) => (
            <div key={msg._id} className={`chat ${msg.sender === "me" ? "chat-end" : "chat-start"}`}>
                
                {/* Avatar (only for 'them') */}
                {msg.sender === "them" && (
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                        <img alt="User" src={displayUser.profileImg} />
                        </div>
                    </div>
                )}

                {/* Message Bubble */}
                <div className={`chat-bubble max-w-[80%] shadow-md ${
                    msg.sender === "me" 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                    : "bg-slate-800 text-slate-200 border border-slate-700"
                }`}>
                    {msg.text}
                </div>
                
                {/* Time Footer */}
                <div className="chat-footer opacity-50 text-xs text-slate-500 mt-1">
                    {msg.time}
                </div>
            </div>
        ))}
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* --- Input Area --- */}
      <form onSubmit={handleSendMessage} className="p-4 bg-slate-950/80 border-t border-slate-800 flex gap-3 items-center">
        
        <button type="button" className="btn btn-circle btn-ghost btn-sm text-slate-400 hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
        </button>

        <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 input input-bordered bg-slate-900 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 rounded-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
        />

        <button 
            type="submit" 
            className="btn btn-circle bg-blue-600 hover:bg-blue-500 border-none text-white shadow-lg shadow-blue-600/20"
            
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
        </button>
      </form>

    </div>
  );
};

export default Chat;