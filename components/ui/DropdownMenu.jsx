"use client";
import { useTheme } from "@/components/template/ConfigContext";
import React, { useEffect, useRef, useState } from "react";

export default function DropdownMenu({btn, menuStyle, children}){
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

    // Handle child click
    function handleChildClick(){
        setOpenMenu(false);
    }

    return(
        <div className="relative" ref={dropdownRef}>
            <button 
                className="block w-full"
                onClick={() => setOpenMenu(!openMenu)}
            >
                {btn}
            </button>
            <div className={`bg-${accentColor} text-white absolute z-20 transition duration-200 ease-out opacity-0 overflow-hidden ${openMenu ? "opacity-100" : "pointer-events-none"} ${menuStyle}`}>
                {/* Clone children and attach the click handler */}
                {React.Children.map(children, (child) =>
                    React.cloneElement(child, {
                        onClick: (e) => {
                            if (child.props.onClick) child.props.onClick(e);
                            handleChildClick();
                        },
                    })
                )}
            </div>
        </div>
    );
}