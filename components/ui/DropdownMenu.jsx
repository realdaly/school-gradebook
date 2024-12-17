"use client";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useTheme } from "@/components/template/ConfigContext";

export default function DropdownMenu({btn, children}){
    const { accentColor } = useTheme();

    return(
        <Menu>
            <MenuButton>
                {btn}
            </MenuButton>
            <MenuItems 
                anchor={{ to: "bottom", gap: "4px" }}
                transition
                className={`bg-${accentColor} text-white rounded-3xl origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0`}
            >
                {children}
            </MenuItems>
        </Menu>
    );
}