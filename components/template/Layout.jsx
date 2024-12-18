"use client";
import { useEffect, useState } from "react";
import Header from "@/components/template/Header";
import initDatabase from "@/db/initDatabase";
import Breadcrumb from "@/components/template/Breadcrumb";

export default function Layout({children, beadcrumb}){
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
            <Breadcrumb>
                {beadcrumb}
            </Breadcrumb>
            
            {!isLoading && children}
        </>
    );
}