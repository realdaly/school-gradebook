"use client";
import { useEffect, useState } from "react";
import Header from "@/components/template/Header";
import initDatabase from "@/db/initDatabase";
import Breadcrumb from "@/components/template/Breadcrumb";

export default function Layout({children, beadcrumb, tools}){
    const [isLoading, setIsLoading] = useState(true);

    async function createDatabaseTables(){
        await initDatabase(setIsLoading);
        setIsLoading(false);

    }

    useEffect(() => {
        createDatabaseTables();
    }, []);

    return(
        <>
            <Header />
            <Breadcrumb
                tools={tools}
            >
                {beadcrumb}
            </Breadcrumb>
            
            {!isLoading && children}
        </>
    );
}