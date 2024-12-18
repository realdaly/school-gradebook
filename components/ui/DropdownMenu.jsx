"use client";
import { useTheme } from "@/components/template/ConfigContext";
import { useEffect, useRef, useState } from "react";

export default function DropdownMenu({btn, children}){
    const { accentColor } = useTheme();
    const dropdownRef = useRef(null);
    let [openMenu, setOpenMenu] = useState(false);

    // Close the menu if clicked outside
    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [setOpenMenu]);

    return(
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setOpenMenu(!openMenu)}>
                {btn}
            </button>
            <div className={`bg-${accentColor} text-white absolute rounded-3xl transition duration-200 ease-out opacity-0 overflow-hidden ${openMenu ? "opacity-100" : "pointer-events-none"}`}>
                {children}
            </div>
        </div>
    );
}