"use client";
import { useState } from "react";
import Loader from "@/components/ui/Loader";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page(){
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const classLabel = searchParams.get("clabel");
    const breadcrumb = (
        <Link 
            className="text-white bg-accent1 py-1.5 px-2 rounded-full"
            href={`#`}
        >
            {classLabel}
        </Link>
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