"use client";
import { useState, useEffect } from "react";
import { Appbar } from "@/components/Appbar";
import { Balance } from "@/components/Balance";
import Users from "@/components/Users";
import PageLoader from "@/components/PageLoader";

export default function Dashboard() {
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleBalance = (balance: string) => {
    const trimmedBalance = parseFloat(balance).toFixed(2);
    setBalance(trimmedBalance);
  };

  return (
    <>
      {isLoading ? <PageLoader /> : null}
      <div>
        <Appbar />
        <div className="m-8">
          <Balance value={balance} />
          <Users handleBalance={handleBalance} setLoading={setIsLoading} />
        </div>
      </div>
    </>
  );
}
