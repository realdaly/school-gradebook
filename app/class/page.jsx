"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/template/Layout";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import { IoMdArrowDropleft } from "react-icons/io";
import StudentsMarks from "@/components/classpage/StudentsMarks";
import PrintBtn from "@/components/template/PrintBtn";

export default function Page(){
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useState(null);
    
    const classId = searchParams?.get("classid");
    const classLabel = searchParams?.get("classlabel");
    const isLiterary = searchParams?.get("isliterary");
    
    const breadcrumb = (
        <>
            <BreadcrumbBtn 
                href="#" 
                label={classLabel} 
            />
            <IoMdArrowDropleft />
        </>
    );

    
    useEffect(() => {
        setSearchParams(new URLSearchParams(window.location.search));
        setIsLoading(false);
    }, []);

    if (!searchParams) {
        return <Loader />;
    }

    return(
        <Layout 
            beadcrumb={breadcrumb}
            tools={
                <PrintBtn />
            }
        >
            {
                isLoading ? 
                    <Loader />
                :
                <StudentsMarks 
                    classId={classId} 
                    isLiterary={isLiterary}
                />
            }
        </Layout>
    );
}

