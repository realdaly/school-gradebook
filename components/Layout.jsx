import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";

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