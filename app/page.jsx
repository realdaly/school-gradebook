"use client";
import ClassesComponent from "@/components/homepage/ClassesComponent";
import CreateClassBtn from "@/components/homepage/CreateClassBtn";
import Layout from "@/components/template/Layout";
import readClasses from "@/utils/homepage/readClasses";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/template/ConfigContext";

export default function Page(){
    const { loading } = useTheme();
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        await readClasses(setClasses);
    };

    useEffect(() => {
        if (loading == false) {
            fetchClasses();
        }
     }, [loading]);

    return(
        <Layout>
            <ClassesComponent 
                classes={classes}
                fetchClasses={fetchClasses}
            />
            <CreateClassBtn fetchClasses={fetchClasses} />
        </Layout>
    );
}