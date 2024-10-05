import { useAppStore } from '@/stores'
import { HOST } from '@/utils/constants'
import {useEffect,useContext,createContext,useRef} from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext(null)


export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
 const socket = useRef();
 const { userInfo, addMessage } = useAppStore();

 
  useEffect(() => {
    if(userInfo){
      socket.current = io(HOST,{withCredentials:true,
        query:{userId:userInfo.id}
      });   
        socket.current.on("connect",()=>{
            console.log("connected to socket server");
        }); 

  const handleRecieveMessage = (message) => {
    const {SelectedChatData,SelectedChatType} = useAppStore.getState();
    if(SelectedChatType!==undefined  && (SelectedChatData._id!==message.sender._id || SelectedChatData._id!==message.recipient._id)){
       addMessage(message); 

    }
    addContactsInDMContacts(message);
  }
 
  const handleRecieveChannelMessage = (message) => {
    
       const {SelectedChatData,
        SelectedChatType,
        addMessage,
         addChannelInChannelList,
         addContactsInDMContacts
        } = useAppStore.getState();

       if(SelectedChatType=== "Channel" && SelectedChatData._id===message.channelId){
          addMessage(message);
        }
        addChannelInChannelList(message);


  }







  socket.current.on("recieveMessage",handleRecieveMessage);
  socket.current.on("recieve-Channel-Message",handleRecieveChannelMessage);

        return () => {
            socket.current.disconnect();
        }

    }
  }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current}>
        {children}
        </SocketContext.Provider>
    )

}