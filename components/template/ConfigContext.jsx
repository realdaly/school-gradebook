"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import readConfig from "@/utils/readConfig";

const ConfigContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [accentColor, setAccentColor] = useState("accent1");

    useEffect(() => {
        readConfig(setTitle, accentColor, setAccentColor);
        setLoading(false);
    }, []);

    return (
    <ConfigContext.Provider 
        value={{ 
            title,
            setTitle,
            accentColor, 
            setAccentColor,
            loading,
            setLoading,
        }}
    >
        {children}
    </ConfigContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ConfigContext);
}