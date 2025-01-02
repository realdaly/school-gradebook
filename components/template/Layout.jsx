"use client";
import { useEffect, useState } from "react";
import Header from "@/components/template/Header";
import initDatabase from "@/db/initDatabase";
import Breadcrumb from "@/components/template/Breadcrumb";
import SuccessAlert from "@/components/template/SuccessAlert";
import { useTheme } from "@/components/template/ConfigContext";

export default function Layout({children, beadcrumb, tools}){
    const { isAlert, setIsAlert } = useTheme();
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
            <SuccessAlert
                isVisible={isAlert}
                setIsVisible={setIsAlert}
                message="تم"
            />
        </>
    );
}