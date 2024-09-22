import { useAppStore } from "@/stores";
import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClinet } from "@/lib/api-clinet";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  Auth_Route,
  HOST,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [Image, setImage] = useState(null);
  const [Hover, setHover] = useState(false);
  const [SelectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef();

  useEffect(() => {
    if (userInfo.ProfileSetup) {
      setfirstName(userInfo.firstName);
      setlastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }

    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo]);

  const handleNavigate = () => {
    if (userInfo.ProfileSetup) {
      navigate("/chat");
    } else {
      toast.error("please setup profile.");
    }
  };
  const validateProfile = () => {
    if (!firstName) {
      toast.error("first name is  required");
      return false;
    }

    if (!lastName) {
      toast.error("last name is  required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await apiClinet.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: SelectedColor },
          { withCredentials: true }
        );

        if (res.status === 200) {
          setUserInfo({ ...res.data });
          toast.success("profile updated successfully");
          navigate("/chat");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log({ file });
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const res = await apiClinet.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
      });
      if (res.status === 200 && res.data.image) {
        setUserInfo({ ...userInfo, image: res.data.image });
        toast.success("profile image updated successfully");
      }
    }
  };
  const handleImageDelete = async () => {
    try {
      const res = await apiClinet.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image removed sucessfully.");
        setImage(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10  w-full">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-3xl lg:text-4xl text-white/90 cursor-pointer " />
        </div>
        <div className="grid grid-col-2 w-full gap-4 md:flex md:gap-7">
          <div
            className="h-full w-32 md:w-48 
          md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {Image ? (
                <AvatarImage
                  src={Image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black "
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32  md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${colors[SelectedColor]}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {Hover && (
              <div
                className=" absolute inset-0 flex items-center justify-center bg-black/90 ring-fuchsia-50  rounded-full"
                onClick={Image ? handleImageDelete : handleFileInputClick}
              >
                {Image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer " />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer " />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpeg, .svg, .jpeg, .webp"
            />
          </div>
          <div className="flex min-w-34 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full ">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none  "
              />
            </div>
            <div className="w-full ">
              <Input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none  "
              />
            </div>
            <div className="w-full ">
              <Input
                placeholder="Last name"
                type="email"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none  "
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    SelectedColor === index
                      ? "outline outline-white/50 outlin-1"
                      : ""
                  }}
                    `}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-600 hover:bg-purple-900 transition-all duration-300 "
            onClick={saveChanges}
          >
            saveChanges
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
