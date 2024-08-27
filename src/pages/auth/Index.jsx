import React from "react";
import Background from "@/assets/login2.png";
import Victory from "@/assets/Victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const Auth = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const handleLogin= async ()=>{

  }
 const handleSignup = async ()=>{

 }

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] border-2 border-white text-opactiy-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl"> Welcome</h1>
              <img src={Victory} alt="victory img" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              {" "}
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex justify-center items-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                  value="Login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                  value="Signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Login" className="flex flex-col mt-10 gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />

                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />


                <Button className="rounded-full p-6" onChange={handleLogin} >Login</Button>
              </TabsContent>

              <TabsContent value="Signup" className="flex flex-col  gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />

                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6 "
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />

                <Input
                  placeholder="Confirm password"
                  type="password"
                  className="rounded-full p-6 "
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />

<Button className="rounded-full p-6" onChange={handleSignup} >Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="flex justify-center items-center "></div>
      </div>
    </div>
  );
};

export default Auth;
