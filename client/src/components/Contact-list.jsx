import React from "react";
import { useAppStore } from "@/stores";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    setSelectedChatData,
    setSelectedChatType,
    SelectedChatType,
    SelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleCLick = (contact) => {
    if (isChannel) {
      setSelectedChatType("Channel");
      return;
    } else setSelectedChatType("Contact");
    setSelectedChatData(contact);
    if (SelectedChatData && SelectedChatData._id === contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5 t">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all  duration-300 cursor-pointer ${
            SelectedChatData && SelectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[$841ff]"
              : "hover:bg-[#f1f1f111]"
          } `}
          onClick={() => handleCLick(contact)}
        >
          <div className="flex items-center justify-start gap-5 text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black "
                  />
                ) : (
                  <div
                    className={`
                            ${
                              SelectedChatData &&
                              SelectedChatData._id === contact._id
                                ? "bg-[#ffffff22] border border-white/70"
                                : getColor(contact.color)
                            }
                            uppercase h-10 w-10  text-large  border-[1px] flex items-center justify-center rounded-full ${getColor(
                              contact.color
                            )}`}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift()
                      : contact.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#ffffff22] h-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>
                {contact.firstName} {contact.lastName}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
