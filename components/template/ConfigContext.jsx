"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import readConfig from "@/utils/readConfig";
import readSubjects from "@/utils/subjects/readSubjects";
import readTerms from "@/utils/terms/readTerms";
import initDatabase from "@/db/initDatabase";

const ConfigContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [firstRun, setFirstRun] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    // config states
    const [title, setTitle] = useState("");
    const [school, setSchool] = useState("");
    const [year, setYear] = useState("");
    const [principal, setPrincipal] = useState("");
    const [accentColor, setAccentColor] = useState("accent1");

    let [subjects, setSubjects] = useState([]);
    let [terms, setTerms] = useState([]);

    async function createDatabaseTables(){
        await initDatabase();
    }

    async function getConfig(){
        await readConfig(
            setTitle, 
            setSchool,
            setYear, 
            setPrincipal, 
            accentColor, 
            setAccentColor,
            setFirstRun
        );
    }

    async function getSubjects(){
        const fetchedSubjects = await readSubjects();
        setSubjects(fetchedSubjects);
    };

    async function getTerms(){
        const fetchedTerms = await readTerms();
        setTerms(fetchedTerms);
    };

    async function initialFunction(){
        await createDatabaseTables();
        await getConfig();
        await getSubjects();
        await getTerms();
        setLoading(false);
    }

    useEffect(() => {
        initialFunction();
    }, []);

    return (
    <ConfigContext.Provider 
        value={{ 
            title,
            setTitle,
            school,
            setSchool,
            year,
            setYear,
            principal,
            setPrincipal,
            accentColor, 
            setAccentColor,
            loading,
            setLoading,
            subjects,
            getSubjects,
            terms,
            getTerms,
            isAlert,
            setIsAlert,
            firstRun,
        }}
    >
        {children}
    </ConfigContext.Provider>
    )
}

export const useTheme = () => {
    return useContext(ConfigContext);
}