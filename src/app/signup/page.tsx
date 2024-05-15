"use client";

import { useState, useEffect } from "react";
import { BottomWarning } from "@/components/BottomWarning";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import InputBox from "@/components/InputBox";
import SubHeading from "@/components/SubHeading";
import axios from "axios";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import Toast from "@/components/WarningToast";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the loader after 1 second
    }, 1000);

    return () => {
      clearTimeout(timer); // Clean up the timer on unmount
    };
  }, []);

  return (
    <>
      {isLoading ? <PageLoader /> : null}
      <div className="bg-gray-900 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"} />
            <SubHeading label={"Enter your information to create an account"} />
            <InputBox
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="John"
              label={"First Name"}
            />
            <InputBox
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Doe"
              label={"Last Name"}
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
              <Button
                onClick={async () => {
                  if (password.length < 6) {
                    toast.warn("🦄 Wow so easy!", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });

                    console.log("yoyo");
                    return;
                  }
                  try {
                    const response = await axios.post(
                      "https://stingray-app-lnpgp.ondigitalocean.app/api/v1/user/signup",
                      {
                        username,
                        firstName,
                        lastName,
                        password,
                      }
                    );
                    localStorage.setItem("token", response.data.token);
                    router.push("/dashboard");
                  } catch (error) {
                    console.error("Error during signup:", error);
                    // Handle error, e.g., show an error message to the user
                  }
                }}
                label="Sign up"
              />
            </div>
            <BottomWarning
              label={"Already have an account?"}
              buttonText={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
