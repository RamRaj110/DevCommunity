import  { useEffect, useRef, } from "react"; 
import { createSocketConnection } from "../utils/socket";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {

    const {id:targetUserId}=useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [targetUser, setTargetUser] = useState('');
    const user = useSelector((state) => state.userInfo.userInfo);
    
    const userId = user ? user?._id : null;
 
  const messagesEndRef = useRef(null);
const chatData = async () => {
    try {
        const res = await axios.get(BASE_URL + "chat/" + targetUserId, {
            withCredentials: true
        });
        
        const targetUserData = res.data.messages.find((msg) => {
            return msg.sender._id !== userId; 
        })?.sender; 
        
        if (targetUserData) {
            setTargetUser(targetUserData);
        }
        
        // Format messages
        const formattedMessages = res.data.messages.map((msg) => ({
            key: msg._id,
            _id: msg._id,
            firstName: msg.sender.firstName,
            text: msg.text,
            time: new Date(msg.createdAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            sender: msg.sender._id === userId ? "me" : "them",
        }));
       
        setMessages(formattedMessages);

    } catch (error) {
        console.log("Error in chat", error);
    }
}

const fetchTargetUser = async () => {
    if (!targetUserId) return;
    try {
        const res = await axios.get(`${BASE_URL}users/${targetUserId}`, { withCredentials: true });
        const userData = res.data.user ?? res.data;
        if (userData) setTargetUser(userData);
    } catch (err) {
        console.log("Failed to fetch target user", err);
    }
}

useEffect(() => {
    if (!targetUserId) return;
    chatData();
    fetchTargetUser();
}, [targetUserId, userId]);


    useEffect(() => {
        if(!userId || !targetUserId) return;
        const socket =  createSocketConnection()
        socket.emit('joinChat',{ firstName:user.firstName,userId, targetUserId  });
        socket.on('receiveMessage', (messageData) => {
            setMessages((prevMessages) => [...prevMessages, { ...messageData, sender: messageData.userId === userId ? "me" : "them" }]);
        });


        return () => {
            socket.disconnect();
        };
    }, [ userId, targetUserId ]);

// auto-scroll to bottom when messages change
useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const socket =  createSocketConnection()

    socket.emit('sendMessage', {
        firstName: user.firstName,
        userId,
        targetUserId,
        text: newMessage,
    });
    setNewMessage("");
  }

 

  return (
    <>  <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
      </div>
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden mt-10">
         
      <div className="bg-slate-950/80 p-4 border-b border-slate-800 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700">
                    <img src={targetUser?.profileImg} alt="user" className="w-full h-full object-cover" />
                </div>
                {/* Online Status Dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">{targetUser?.firstName} {targetUser?.lastName}</h3>
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
                        <img alt="User" src={targetUser?.profileImg} />
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
      <input 
    type="text" 
    placeholder="Type a message..." 
    className="flex-1 input input-info  bg-slate-900 border-0 focus:outline-none focus:ring-0 focus:bg-slate-800 text-white placeholder-slate-500 rounded-full transition-colors"
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
    </div>
    </>
  );
};

export default Chat;