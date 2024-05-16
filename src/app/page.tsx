"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader2 from "@/components/Loader2";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const router = useRouter();
  const currentPathname = usePathname();

  useEffect(() => {
    // Redirect to the /signin page
    sessionStorage.setItem("referrer", currentPathname);
    router.replace(`/signin`);
  }, [router]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Loader2 />
    </>
  );
}
