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
  });
  