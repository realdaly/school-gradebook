"use client";
import Header from "@/components/template/Header";
import Breadcrumb from "@/components/template/Breadcrumb";
import SuccessAlert from "@/components/template/SuccessAlert";
import { useTheme } from "@/components/template/ConfigContext";

export default function Layout({children, beadcrumb, tools}){
    const { isAlert, setIsAlert, loading } = useTheme();

    return(
        <>
            <Header />
            <Breadcrumb
                tools={tools}
            >
                {beadcrumb}
            </Breadcrumb>
            
            {!loading && children}
            <SuccessAlert
                isVisible={isAlert}
                setIsVisible={setIsAlert}
                message="تم"
            />
        </>
    );
}