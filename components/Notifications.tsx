"use client";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Notifications() {
  useEffect(() => {
    toast.success("New price alert!", { duration: 5000 });
  }, []);

  return <Toaster />;
}
