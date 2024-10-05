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
 const channels = get().channels;
 const data = channels.find((channels)=>channels._id === message.channelId);
 const index = channels.findIndex((channel)=>channel._id === message.channelId);

 if(index!==-1 && index !==undefined){
 channels.splice(index,1);
  channels.unshift(data);}
  },

addContactsInDMContacts: (message) => {
const userId = get().userInfo.id;
const fromId = message.sender._id === userId ? message.recipient._id : message.sender._id;

const fromData = message.sender._id === userId ? message.recipient : message.sender;
const dmContacts = get().directMessagesContacts;
const data = dmContacts.find((contact) => contact._id === fromId);
const index = dmContacts.findIndex((contact) => contact._id === fromId);
if(index !== -1 && index !== undefined){

  dmContacts.splice(index,1);
  dmContacts.unshift(data); 
}else{
  
  dmContacts.unshift(fromData);
}
set({directMessagesContacts:dmContacts});

  }});
  