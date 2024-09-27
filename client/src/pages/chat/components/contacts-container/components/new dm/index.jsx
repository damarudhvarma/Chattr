import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { animationDefaultOptions } from "@/lib/utils";
import Lottie from "react-lottie";

const NewDm = () => {
   
    const [openNewContactModel, setopenNewContactModel] = useState(false)
    const searchContacts = (SearchTerm) => {

    }  

    const [searchedContacts, setsearchedContacts] = useState([])
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
        searchedContacts.length<=0 && <div className="flex-1 md:bg-[#181920] md:flex mt-5 flex-col justify-center items-center hidden duration-300 transition-all  ">
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

export default NewDm