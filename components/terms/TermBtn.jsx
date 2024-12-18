import UpdateTermBtn from "@/components/terms/UpdateTermBtn";
import DeleteTermBtn from "@/components/terms/DeleteTermBtn";

export default function TermBtn({currentTerm, fetchTerms}){
    return(
        <div 
            className="pr-5 pl-3 py-1 text-xl first:pt-2 transition-all hover:bg-comp hover:text-black cursor-default flex items-center justify-between gap-x-3"
        >
            <div
                className="w-max line-clamp-1"
            >
                {currentTerm.title}
            </div>
            <div className="flex items-center">
                <UpdateTermBtn 
                    currentTerm={currentTerm}
                    fetchTerms={fetchTerms}
                />
                {/* <DeleteTermBtn
                    currentTerm={currentTerm}
                    fetchTerms={fetchTerms}
                /> */}
            </div>
        </div>
    );
}