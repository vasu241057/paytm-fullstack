"use client";
import { BottomWarning } from "@/components/BottomWarning";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import InputBox from "@/components/InputBox";
import SubHeading from "@/components/SubHeading";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { z } from "zod";
import { WarnToast } from "@/components/WarningToast";
import { ToastContainer } from "react-toastify";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const referrer =
    typeof window !== "undefined" ? sessionStorage.getItem("referrer") : null;
  const userSchema = z.object({
    username: z.string().email().min(3).max(255).trim(),
    password: z.string().min(6).max(20).trim(),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the loader after 1 second
    }, 1000);
    console.log(referrer);

    return () => {
      clearTimeout(timer); // Clean up the timer on unmount
    };
  }, []);

  const onclickHandler = async () => {
    const { success, error } = userSchema.safeParse({
      username,
      password,
    });
    if (!success) {
      const field = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;
      WarnToast(`${field}: ${errorMessage}`);
      return;
    }

    try {
      const response = await axios.post(
        "https://stingray-app-lnpgp.ondigitalocean.app/api/v1/user/signin",
        { username, password }
      );

      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during signIn:", error);
    }
  };

  return (
    <>
      {!(referrer === "/") ? isLoading ? <PageLoader /> : null : null}
      <div className="bg-gray-900 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <SubHeading
              label={"Enter your credentials to access your account"}
            />
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
              <Button label={"Sign in"} onClick={onclickHandler} />
            </div>
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}
