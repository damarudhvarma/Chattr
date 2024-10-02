export const createChatSlice = (set, get) => ({
    SelectedChatType: undefined,
    SelectedChatData: undefined,
    selectedeChatMessages: [],
    directMessagesContacts: [],
  
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
  