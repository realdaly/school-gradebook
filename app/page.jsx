"use client";
import Classes from "@/components/homepage/Classes";
import CreateClassBtn from "@/components/homepage/CreateClassBtn";
import Layout from "@/components/template/Layout";
import readClasses from "@/utils/homepage/readClasses";
import { useEffect, useState } from "react";

export default function Page(){
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        await readClasses(setClasses);
    };

    useEffect(() => {
        fetchClasses();
     }, []); 

    return(
        <Layout>
            <Classes 
                classes={classes}
                fetchClasses={fetchClasses}
            />
            <CreateClassBtn fetchClasses={fetchClasses} />
        </Layout>
    );
}