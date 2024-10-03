import { useSocket } from "@/context/SocketContext";
import { apiClinet } from "@/lib/api-clinet";
import { useAppStore } from "@/stores";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import React, { useState, useRef,useEffect } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";



const Messagebar = () => {

const Socket = useSocket();
const fileInputRef = useRef();
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

  const handleAttachmentClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }

    console.log("from attachment click")
  }

  const handleAttachmentChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
  
        const res = await apiClinet.post(UPLOAD_FILE_ROUTE, formData, { withCredentials: true });
  
        if (res.status === 200 && res.data) {
          console.log("File uploaded successfully:", res.data.filePath);
          if (SelectedChatType === "Contact") {
            Socket.emit("sendMessage", {
              sender: userInfo.id,
              recipient: SelectedChatData._id,
              content: undefined,
              messageType: "file",
              fileUrl: res.data.filePath,
            });
          }
        }
      } else {
        console.log("No file selected");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
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

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handleAttachmentClick}
        >
          <GrAttachment className="text-2xl" />
        </button> 
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleAttachmentChange} />
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
