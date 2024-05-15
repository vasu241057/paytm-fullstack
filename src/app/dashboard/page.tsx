"use client";
import { useState, useEffect } from "react";
import { Appbar } from "@/components/Appbar";
import { Balance } from "@/components/Balance";
import Users from "@/components/Users";
import Loader from "@/components/Loader"; // Import your Loader component

const Dashboard = () => {
  const [balance, setBalance] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const handleBalance = (balance: string) => {
    setBalance(balance);
  };

  return (
    <div>
      <Appbar />

      <div className="m-8">
        <Balance value={balance} />
        <Users handleBalance={handleBalance} setLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default Dashboard;
