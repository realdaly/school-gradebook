"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import initDatabase from "@/db/initDatabase";
import Classes from "@/components/homepage/Classes";
import Layout from "@/components/Layout";

export default function Page(){
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initDatabase(setIsLoading);
    }, []);

    return(
        <Layout>
            {isLoading ? 
                <Loader />
            :
                <Classes />
            }
        </Layout>
    );
}