"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/template/Layout";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import { IoMdArrowDropleft } from "react-icons/io";
import PrintBtn from "@/components/template/PrintBtn";
import ZoomBtns from "@/components/template/ZoomBtns";
import StudentTable from "@/components/studentpage/StudentTable";

export default function Page(){
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useState(null);

    
    const classId = searchParams?.get("classid");
    const classLabel = searchParams?.get("classlabel");
    const isLiterary = searchParams?.get("isliterary");
    const studentId = searchParams?.get("studentid");
    const [studentName, setStudentName] = useState("");
    
    const breadcrumb = (
        <>
            <BreadcrumbBtn 
                href={`/class?classlabel=${classLabel}&classid=${classId}&isliterary=${isLiterary}`} 
                label={classLabel} 
            />
            <IoMdArrowDropleft />
            <BreadcrumbBtn 
                href=""
                label={studentName} 
            />
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
                <>
                    <ZoomBtns />
                    <PrintBtn />
                </>
            }
        >
            {
                isLoading ? 
                    <Loader />
                :
                <StudentTable
                    classId={classId}
                    classLabel={classLabel}
                    isLiterary={isLiterary}
                    studentId={studentId}
                    setStudentName={setStudentName}
                />
            }
        </Layout>
    );
}

