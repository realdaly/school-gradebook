"use client";
import { useEffect } from "react";
import { FcApproval } from "react-icons/fc";

export default function SuccessAlert({isVisible, setIsVisible}) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="flex justify-center">
      <div className="fixed bottom-4 flex items-center gap-x-4 bg-emerald-50 border border-emerald-400 text-black/70 px-4 py-1 rounded-md shadow-lg transition-all duration-300 ease-in-out transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-5">
        <FcApproval className="size-5" />
        <span className="text-base font-bold">تــــــــم</span>
      </div>
    </div>
  )
}