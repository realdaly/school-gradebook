"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/template/Layout";
import { useSearchParams } from "next/navigation";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import { IoMdArrowDropleft } from "react-icons/io";
import StudentsMarks from "@/components/classpage/StudentsMarks";

export default function Page(){
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    
    const classId = searchParams.get("classid");
    const classLabel = searchParams.get("classlabel");
    
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
        setIsLoading(false);
    }, []);

    return(
        // wrapping the component with suspense boundary to use search params
        <Suspense fallback={<Loader />}>
            <Layout beadcrumb={breadcrumb}>
                {
                    isLoading ? 
                        <Loader />
                    :
                    <StudentsMarks classId={classId} />
                        
                }
            </Layout>
        </Suspense>
    );
}