import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react" 
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
import { HOST, SEARCH_CONTACTS_ROUTE } from "@/utils/constants"
import { apiClinet } from "@/lib/api-clinet"
import { useAppStore } from '@/stores'


const NewDm = () => {
    const {setSelectedChatType,setSelectedChatData} = useAppStore()
    const [openNewContactModel, setopenNewContactModel] = useState(false)
    const [searchedContacts, setsearchedContacts] = useState([])
    const searchContacts = async (searchTerm) => {
  try {
            if(searchTerm.length>0){
                const res = await apiClinet.post(SEARCH_CONTACTS_ROUTE, {searchTerm},{withCredentials:true});

                if(res.status===200 && res.data.contacts){ 
                    setsearchedContacts(res.data.contacts)
                }
                
            }
            
            else{
                setsearchedContacts([]);
            }
        
    }  catch (error) {
        console.log(error)
    }
    }
 const selectNewContact = (contact) => {
    setopenNewContactModel(false)
    setSelectedChatType("Contact")
    setSelectedChatData(contact) 
    setsearchedContacts([])
    
 }



    
  return (
    <>
    <TooltipProvider>
  <Tooltip >
    <TooltipTrigger>
        <FaPlus 
        className="text-neutral-400 cursor-pointer font-light text-opacity-90 text-start hover:text-neutral-100 transition-all duration-300"
        onClick={()=>setopenNewContactModel(true)}
        
        />
        </TooltipTrigger>
    <TooltipContent 
    className=" bg-[#1c1b1e] text-white border-none p-3 mb-2"
    
    >
      Select New Contact
    </TooltipContent>
  </Tooltip>
</TooltipProvider>



<Dialog open ={openNewContactModel} onOpenChange={setopenNewContactModel} >
  
  <DialogContent className='bg-[#181920] border-none text-white flex flex-col w-[400px] h-[400px]'>
    <DialogHeader>
      <DialogTitle>Please select a contact</DialogTitle>
      <DialogDescription>
        
      </DialogDescription>
    </DialogHeader>
    <div>
        <Input 
        placeholder="Search contacts" 
        className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
        onChange={(e)=>searchContacts(e.target.value)}
        
        />
    </div>
    {
      searchedContacts.length>0 &&  <ScrollArea className='h-[250px]' >
        <div className="flex flex-col gap-5">
            {
                searchedContacts.map ((contact)=>(
                   < div key={contact._id} className="flex gap-3 items-center cursor-pointer"
                   onClick={()=>selectNewContact(contact)}
                   >

<div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {contact.image ? (
              <AvatarImage
                src={`${HOST}/${contact.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black rounded-full "
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-large  border-[1px] flex items-center justify-center rounded-full ${getColor(
                  contact.color
                )}`}
              >
                {contact.firstName
                  ? contact.firstName.split("").shift()
                  : contact.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className="flex flex-col ">
            <span>

        {contact.firstName && contact.lastName
            ? `${contact.firstName} ${contact.lastName}`
            :"contact.email"}
            </span>
            <span className="text-xs">{contact.email}</span>
        </div>
     </div>
                ))
            }

        </div>

    </ScrollArea>
  }
    {
        searchedContacts.length<=0 && <div className="flex-1 md:bg-[#181920] md:flex mt-5 flex-col justify-center items-center hidden duration-300 transition-all  md:mt-0 ">
        <Lottie
          isClickToPauseDisabled={true}
          height={100}
           width={100}
          options={animationDefaultOptions}
        />
        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center ">
          <h3 className="poppins-medium">
            HI <span className="text-purple-500 ">!</span> Search new {" "}
            <span className="text-purple-500">Contact.</span>
          </h3>
        </div>
      </div>
    }
  </DialogContent>
</Dialog>


    </>
  )
}

export default NewDm;

