"use client";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/template/Layout";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";

export default function Page(){
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const classLabel = searchParams.get("clabel");
    const breadcrumb = (
        <BreadcrumbBtn href="#" label={classLabel} />
    );

    return(
        <Layout beadcrumb={breadcrumb}>
            {
                isLoading ? 
                    <Loader />
                :
                ""
            }
        </Layout>
    );
}