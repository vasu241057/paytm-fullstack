"use client";
import { BottomWarning } from "@/components/BottomWarning";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import InputBox from "@/components/InputBox";
import SubHeading from "@/components/SubHeading";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="vasu@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    { username, password }
                  );

                  localStorage.setItem("token", response.data.token);
                  router.push("/dashboard");
                } catch (error) {
                  console.error("Error during signIn:", error);
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
