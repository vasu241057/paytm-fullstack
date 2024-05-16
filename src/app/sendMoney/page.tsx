"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, Suspense, useEffect } from "react";
import PageLoader from "@/components/PageLoader";
import { ToastContainer } from "react-toastify";
import { SuccessToast } from "@/components/SuccessToast";
import { useRouter } from "next/navigation";

export default function SendMoney() {
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
      <Suspense fallback={<div>Loading...</div>}>
        <Send />
      </Suspense>
    </>
  );
}

const Send = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState<number>(0);
  const router = useRouter();

  const handleTransfer = async () => {
    try {
      await axios.post(
        "https://stingray-app-lnpgp.ondigitalocean.app/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      SuccessToast("Transaction successful");
      setTimeout(() => {
        router.replace(`/dashboard`);
      }, 2000);
    } catch (error) {
      console.error("Error initiating transfer:", error);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name ? name[0].toUpperCase() : ""}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={handleTransfer}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
