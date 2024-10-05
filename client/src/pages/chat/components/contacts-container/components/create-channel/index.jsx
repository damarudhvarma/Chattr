import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { CREATE_CHANNEL_ROUTE, GET_ALL_CONTACTS_ROUTE } from "@/utils/constants";
import { apiClinet } from "@/lib/api-clinet";
import { useAppStore } from "@/stores";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData, addChannel } =
    useAppStore();
  const [newChannelModal, setnewChannelModal] = useState(false);

  const [Allcontacts, setAllcontacts] = useState([]);
  const [selectedContacts, setselectedContacts] = useState([]);
  const [channelName, setchannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await apiClinet.get(GET_ALL_CONTACTS_ROUTE, {
        withCredentials: true,
      });
      setAllcontacts(res.data.contacts);
    };
    getData();
  }, []);

  const createChannel = async () => {
    try {
      console.log("function called");
      console.log(channelName.length, selectedContacts.length);
      
        if(channelName.length > 0 && selectedContacts.length >0 ){
        const res = await apiClinet.post(CREATE_CHANNEL_ROUTE,{name:channelName,
          members:selectedContacts.map(contact=>contact.value)
        },{withCredentials:true} )

        console.log("from create channnel",res)
        if(res.status===201){
       setchannelName("")
        setselectedContacts([])
        setnewChannelModal(false)
        addChannel(res.data.channel)

        }

      }
      else{
        console.log("error")
      }
    } catch (error) {}
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 cursor-pointer font-light text-opacity-90 text-start hover:text-neutral-100 transition-all duration-300"
              onClick={() => setnewChannelModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className=" bg-[#1c1b1e] text-white border-none p-3 mb-2">
            Create New Channel
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModal} onOpenChange={setnewChannelModal}>
        <DialogContent className="bg-[#181920] border-none text-white flex flex-col w-[400px] h-[400px]">
          <DialogHeader>
            <DialogTitle>
              Please fill up the details for new channel .
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Channel Name"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e) => setchannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector
              className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
              defaultOptions={Allcontacts}
              placeholder="Select Contacts"
              value={selectedContacts}
              onChange={(selected) => setselectedContacts(selected)}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">
                  No results found .
                </p>
              }
            />
          </div>
          <div>
            <Button
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
              onClick={createChannel}
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
