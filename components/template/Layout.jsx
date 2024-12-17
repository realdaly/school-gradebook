"use client";
import { useEffect, useState } from "react";
import Header from "@/components/template/Header";
import initDatabase from "@/db/initDatabase";
import Breadcrumb from "@/components/template/Breadcrumb";
import Loader from "@/components/ui/Loader";

export default function Layout({children, beadcrumb}){
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initDatabase(setIsLoading);
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