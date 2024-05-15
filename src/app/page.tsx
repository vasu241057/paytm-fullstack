"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the /signin page
    router.replace("/signin");
  }, [router]);

  return <h1>redirecting</h1>; // or you can return a loading spinner or a message
}
