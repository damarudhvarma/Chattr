import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/stores";
import EmojiPicker from "emoji-picker-react";
import React, { useState, useRef,useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";



const Messagebar = () => {

const Socket = useSocket();
const EmojiRef = useRef();
const {SelectedChatType,SelectedChatData,userInfo} = useAppStore();

  const [Message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (EmojiRef.current && !EmojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])
  

  const sendMessage = () => {
if(SelectedChatType==="Contact"){
  Socket.emit("sendMessage",{
    sender:userInfo.id,
    recipient:SelectedChatData._id,
    content : Message,
    messageType:"text",
    fileUrl:"undefined"
  })
}


  };


  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  return (
    <div className="h-:[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5  ">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none "
          placeholder="Enter Message"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setShowEmoji(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className=" absolute bottom-16 right-0 " ref={EmojiRef}>
            <EmojiPicker theme="dark" open={showEmoji} onEmojiClick={handleAddEmoji}
            autoFocusSearch={false} />
          </div>
        </div>
      </div>
      <button
        className="bg-[#8417ff] rounded-md flex items-center p-5 justify-center focus:border-none hover:bg-[#741bda] focus:outline-none focus:bg-[#741bda]  focus:text-white duration-300 transition-all"
        onClick={sendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default Messagebar;
