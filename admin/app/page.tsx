"use client"

import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    })
  }, [])
  
  return (
  <div className="flex items-center justify-center h-screen">
    <p className="text-center text-sm">Loading...</p>
  </div>
  );
}
