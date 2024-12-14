import Header from "@/components/template/Header";
import Breadcrumb from "@/components/template/Breadcrumb";

export default function Layout({children, beadcrumb}){
    return(
        <>
            <Header />
            <Breadcrumb>
                {beadcrumb}
            </Breadcrumb>
            {children}
        </>
    );
}