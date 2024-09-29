export const  createChatSlice = (set,get) => ({ 
SelectedChatType:undefined,
SelectedChatData:undefined,
selectedeChatMessages:[],
setSelectedChatType:(SelectedChatType)=>set({SelectedChatType}), 
setSelectedChatData:(SelectedChatData)=>set({SelectedChatData}),
setSelectedChatMessages:(selectedeChatMessages)=>set({selectedeChatMessages}),
closeChat:()=>{
    set({SelectedChatType:undefined,SelectedChatData:undefined,selectedeChatMessages:[]})
}


});
