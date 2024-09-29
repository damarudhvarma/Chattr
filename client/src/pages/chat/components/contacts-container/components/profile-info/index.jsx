import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/stores";
import { HOST, LOGOUT_ROUTE } from "@/utils/constants";
import { useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { apiClinet } from "@/lib/api-clinet";
import { GET_USER_INFO , } from "@/utils/constants";
const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userInfo.
        ProfileSetup) {


        if(!userInfo.firstName || !userInfo.lastName){try {
          const res = await apiClinet.get(GET_USER_INFO,{withCredentials:true}) 
          if (res.status === 200) {
            setUserInfo(res.data);
          }
        } catch (error) {
          console.error("Failed to fetch user info", error);
        }}
      }
    };

    fetchUserInfo();
  }, [userInfo, setUserInfo]);

  const logout = async () => {
    try {
      const res = await apiClinet.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate("/auth");
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <div className=" absolute bottom-0 h-16 flex items-center justify-between w-full px-10 bg-[#2a2b33]  ">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full bg-black "
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-large  border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : userInfo.email}
        </div>
      </div>
      <div className="flex gap-5 ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 font-medium text-xl"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none  text-white">
              <p>Edit profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-500  font-medium text-xl"
                onClick={logout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none  text-white">
              <p>logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
