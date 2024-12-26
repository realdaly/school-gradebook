import UpdateTermBtn from "@/components/terms/UpdateTermBtn";
import DeleteTermBtn from "@/components/terms/DeleteTermBtn";
import { useState } from "react";

export default function TermBtn({currentTerm, getTerms}){
    let [isOpen, setIsOpen] = useState(false);

    return(
        <div 
            onClick={() => setIsOpen(true)}
            className="pr-5 pl-3 py-0.5 text-lg first:pt-2 transition-all hover:bg-comp hover:text-black cursor-default flex items-center justify-between gap-x-3 cursor-pointer"
        >
            <div
                className="w-max line-clamp-1"
            >
                {currentTerm.title}
            </div>
            <div className="flex items-center">
                <UpdateTermBtn 
                    currentTerm={currentTerm}
                    getTerms={getTerms}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
                {/* <DeleteTermBtn
                    currentTerm={currentTerm}
                    getTerms={getTerms}
                /> */}
            </div>
        </div>
    );
}