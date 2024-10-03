import { apiClinet } from "@/lib/api-clinet";
import { useAppStore } from "@/stores";
import { GET_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import moment from "moment";
import { useRef, useEffect } from "react";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";

const MessagesContainer = () => {
  const scrollRef = useRef();
  const {
    SelectedChatType,
    SelectedChatData,
    selectedeChatMessages,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await  apiClinet.post(
          GET_MESSAGES_ROUTE,
          { id: SelectedChatData._id },
          { withCredentials: true }
        );

        if (res.data.messages) {
          setSelectedChatMessages(res.data.messages);
        }
        
      } catch (error) {
        console.log(error)
      }
     
    };

    if (SelectedChatData._id) {
      if (SelectedChatType === "Contact") {
        getMessages();
      }
    }
  }, [SelectedChatData, SelectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedeChatMessages]);

       const checkIfImage = (filePath) => {
       const imageRegex = /\.(jpeg|jpg|gif|png|svg|bmp|webp|ico|heic|heif|tiff|tif)$/i;
        return imageRegex.test(filePath);
       };
   

  const renderMessages = () => {
    let lastDate = null;
    return selectedeChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}

          {SelectedChatType === "Contact" && renderDMMessages(message)}
        </div>
      );
    });
    
  };

  const downloadFile = async (url) => {
    const response = await apiClinet.get(`${HOST}/${url}`,
      {responseType: 'blob'});

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href=urlBlob;
      link.setAttribute('download',url.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);

  }

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === SelectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== SelectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5  text-white/80 border-[#ffffff]/20"
          }
        inline-block p-4 rounded  my-1 max-w-[50%] break-words
    `}
        >
          {message.content}
        </div>
      )}

      {
        message.messageType === "file" && (
          <div
          className={`${
            message.sender !== SelectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5  text-white/80 border-[#ffffff]/20"
          }
        inline-block p-4 rounded  my-1 max-w-[50%] break-words
    `}
        >
          {checkIfImage(message.fileUrl) ? <div className=" cursor-pointer "> <img src={`${HOST}/${message.fileUrl}`} 
          height={300}
          width={300} /> </div>
           :  <div className="flex items-center justify-center gap-4 ">
            <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
            <MdFolderZip/>
            </span>
             <span>{message.fileUrl.split('/').pop()}</span>
             <span className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
             onClick={()=>downloadFile(message.fileUrl)}
             ><IoMdArrowRoundDown/></span>


            </div>}
        </div>
        )
      }

      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full ">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessagesContainer;
