"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import initDatabase from "@/db/initDatabase";
import Classes from "@/components/Classes";

export default function Page(){
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initDatabase(setIsLoading);
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return(
        <>
            <Classes />
        </>
    );
}