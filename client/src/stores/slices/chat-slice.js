import { CloudFog, User } from "lucide-react";

export const createChatSlice = (set, get) => ({
    SelectedChatType: undefined,
    SelectedChatData: undefined,
    selectedeChatMessages: [],
    directMessagesContacts: [],
    isUploading:false,
    isDownloading:false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    channels:[],
    setChannels:(channels)=>set({channels}),  
    setIsUploading:(isUploading)=>set({isUploading}),
    setIsDownloading:(isDownloading)=>set({isDownloading}),
    setFileUploadProgress:(fileUploadProgress)=>set({fileUploadProgress}),
    setFileDownloadProgress:(fileDownloadProgress)=>set({fileDownloadProgress}),

  
    setSelectedChatType: (SelectedChatType) => set({ SelectedChatType }),
    setSelectedChatData: (SelectedChatData) => set({ SelectedChatData }),
    setSelectedChatMessages: (selectedeChatMessages) => set({ selectedeChatMessages }),
    setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),
     addChannel: (channel) => {
      const channels = get().channels;
      set({ channels: [channel,...channels] });
     },

    closeChat: () => {
      set({ SelectedChatType: undefined, SelectedChatData: undefined, selectedeChatMessages: [] });
    },
  
    addMessage: (message) => {
      const SelectedChatMessages = get().selectedeChatMessages; 
      const SelectedChatType = get().SelectedChatType;
  
      set({
        selectedeChatMessages: [
          ...SelectedChatMessages,
          {
            ...message,
            recipient: SelectedChatType === 'Channel' ? message.recipient : message.recipient._id,
            sender: SelectedChatType === 'Channel' ? message.sender : message.sender._id,
          },
        ],
      });
    },
  addChannelInChannelList: (message) => {
    const channels = [...get().channels];
    const index = channels.findIndex((channel) => channel._id === message.channelId);
    
    if(index !== -1) {
      const channel = channels[index];
      channels.splice(index, 1);
      channels.unshift(channel);
      set({ channels });
    }
  },

addContactsInDMContacts: (message) => {
const userId = get().userInfo.id;
const directMessagesContacts = [...get().directMessagesContacts];
const fromId = message.sender._id === userId ? message.recipient._id : message.sender._id;
const fromData = message.sender._id === userId ? message.recipient : message.sender;

const index = directMessagesContacts.findIndex((contact) => contact._id === fromId);

if(index !== -1) {
  directMessagesContacts.splice(index, 1);
  directMessagesContacts.unshift(fromData);
} else {
  directMessagesContacts.unshift(fromData);
}
set({directMessagesContacts});

  }});
  