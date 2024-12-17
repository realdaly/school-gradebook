"use client";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/template/Layout";
import { useSearchParams } from "next/navigation";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import CreateSubjectBtn from "@/components/classpage/CreateSubjectBtn";
import readSubjects from "@/utils/classpage/readSubjects";

export default function Page(){
    const [isLoading, setIsLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const searchParams = useSearchParams();
    
    const classId = searchParams.get("classid");
    const classLabel = searchParams.get("classlabel");
    const subjectId = searchParams.get("subjectid");
    
    const breadcrumb = (
        <>
            <BreadcrumbBtn href="#" label={classLabel} />
            <CreateSubjectBtn 
                subjects={subjects}
                fetchSubjects={fetchSubjects}
            />
        </>
    );

    async function fetchSubjects(){
        await readSubjects(setSubjects);
    };

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