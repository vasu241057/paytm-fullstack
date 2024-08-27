"use client";
import { BottomWarning } from "@/components/BottomWarning";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import InputBox from "@/components/InputBox";
import SubHeading from "@/components/SubHeading";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { z } from "zod";
import { WarnToast } from "@/components/WarningToast";
import { ToastContainer } from "react-toastify";
import { ErrorToast } from "@/components/RedToast";

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
        "https://paytm-backend-uyb3.onrender.com/api/v1/user/signin",
        { username, password }
      );

      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error: any) {
      // Check if the error is from the API response
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data); // Log the full response data
        console.log(error.response.status); // Log the status code
        console.log(error.response.headers); // Log the response headers
        console.log(error.response.data.error);

        // Check if the error message is "invalid credentials"
        if (error.response.data.error === "invalid credentials") {
          console.log(typeof error.response.data.error);
          // ErrorToast("invalid credentials");
          ErrorToast(error.response.data.error);
          console.log("aa");
        } else {
          console.error("Error during signIn:", error.response.data.message);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error during signIn:", error.message);
      }
    }
  };

  return (
    <>
      <ToastContainer />
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
