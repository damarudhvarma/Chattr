export const createChatSlice = (set, get) => ({
    SelectedChatType: undefined,
    SelectedChatData: undefined,
    selectedeChatMessages: [],
    directMessagesContacts: [],
    isUploading:false,
    isDownloading:false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    setIsUploading:(isUploading)=>set({isUploading}),
    setIsDownloading:(isDownloading)=>set({isDownloading}),
    setFileUploadProgress:(fileUploadProgress)=>set({fileUploadProgress}),
    setFileDownloadProgress:(fileDownloadProgress)=>set({fileDownloadProgress}),

  
    setSelectedChatType: (SelectedChatType) => set({ SelectedChatType }),
    setSelectedChatData: (SelectedChatData) => set({ SelectedChatData }),
    setSelectedChatMessages: (selectedeChatMessages) => set({ selectedeChatMessages }),
    setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),
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
            recipient: SelectedChatType === 'channel' ? message.recipient : message.recipient._id,
            sender: SelectedChatType === 'channel' ? message.sender : message.sender._id,
          },
        ],
      });
    },
  });
  