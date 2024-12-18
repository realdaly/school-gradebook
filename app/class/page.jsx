"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/template/Layout";
import { useSearchParams } from "next/navigation";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";

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
                    
                    ""
                }
            </Layout>
        </Suspense>
    );
}