import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react" 
 import { FaPlus } from "react-icons/fa"
 import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { animationDefaultOptions, getColor } from "@/lib/utils";
import Lottie from "react-lottie";
import { GET_ALL_CONTACTS_ROUTE, HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants"
import { apiClinet } from "@/lib/api-clinet"
import { useAppStore } from '@/stores'
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";


const CreateChannel = () => {
    const {setSelectedChatType,setSelectedChatData} = useAppStore()
    const [newChannelModal, setnewChannelModal] = useState(false)
    const [searchedContacts, setsearchedContacts] = useState([])
    const [Allcontacts, setAllcontacts] = useState([]);
    const [selectedContacts, setselectedContacts] = useState([]);
    const [channelName, setchannelName] = useState("")
       
    useEffect(() => {  
        const getData = async()=>{  
           const res = await apiClinet.get(GET_ALL_CONTACTS_ROUTE, { withCredentials: true });
           setAllcontacts(res.data.contacts)

        }
        getData();
     },[]);


const createChannel = async()=>{

}
  




    
  return (
    <>
    <TooltipProvider>
  <Tooltip >
    <TooltipTrigger>
        <FaPlus 
        className="text-neutral-400 cursor-pointer font-light text-opacity-90 text-start hover:text-neutral-100 transition-all duration-300"
        onClick={()=>setnewChannelModal(true)}
        
        />
        </TooltipTrigger>
    <TooltipContent 
    className=" bg-[#1c1b1e] text-white border-none p-3 mb-2"
    
    >
      Create New Channel
    </TooltipContent>
  </Tooltip>
</TooltipProvider>



<Dialog open ={newChannelModal} onOpenChange={setnewChannelModal} >
  
  <DialogContent className='bg-[#181920] border-none text-white flex flex-col w-[400px] h-[400px]'>
    <DialogHeader>
      <DialogTitle>Please fill up the details for new channel .</DialogTitle>
      <DialogDescription>
        
      </DialogDescription>
    </DialogHeader>
    <div>
        <Input 
        placeholder="Channel Name" 
        className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
        onChange={(e)=>setchannelName(e.target.value)}
        value={channelName}
        
        />
    </div>
    <div>
        <MultipleSelector
        className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
        defaultOptions={Allcontacts}
        placeholder="Select Contacts"
        value={selectedContacts}
        onChange={(selected)=>setselectedContacts(selected)}
        emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600">No results found .</p>
        }

        
        />
    </div>
    <div>
        <Button className='w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300'
         
        onClick={createChannel}
        
        >
 Create Channel
        </Button>
    </div>
  </DialogContent>
</Dialog>


    </>
  )
}

export default CreateChannel;

