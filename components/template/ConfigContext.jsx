"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import readConfig from "@/utils/readConfig";
import readSubjects from "@/utils/subjects/readSubjects";
import readTerms from "@/utils/terms/readTerms";

const ConfigContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [accentColor, setAccentColor] = useState("accent1");

    let [subjects, setSubjects] = useState([]);
    let [terms, setTerms] = useState([]);

    async function getConfig(){
        await readConfig(setTitle, accentColor, setAccentColor);
        setLoading(false);
    }

    async function getSubjects(){
        const fetchedSubjects = await readSubjects();
        setSubjects(fetchedSubjects);
    };

    async function getTerms(){
        const fetchedTerms = await readTerms();
        setTerms(fetchedTerms);
    };

    useEffect(() => {
        getConfig();
        getSubjects();
        getTerms();
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
            subjects,
            getSubjects,
            terms,
            getTerms
        }}
    >
        {children}
    </ConfigContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ConfigContext);
}