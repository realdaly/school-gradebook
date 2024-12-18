import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TiDelete } from "react-icons/ti";
import deleteTerm from "@/utils/terms/deleteTerm";

export default function DeleteTermBtn({currentTerm, fetchTerms}){
    let [isOpen, setIsOpen] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await deleteTerm(currentTerm.id);
        await fetchTerms();
    }

    return(
    <>
        <button 
            onClick={() => setIsOpen(true)}
            title="حذف"
            className="px-1 text-danger pt-1 transition-all hover:opacity-75"
        >
            <TiDelete className="size-6" />
        </button>
        <Modal 
            title={`هل أنت متأكد من حذف "${currentTerm.title}"؟`}
            desc="لا يمكن التراجع عن هذه الخطوة!"
            sumbitLabel="حذف"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
            isDanger={true}
        />
    </>
    );
}