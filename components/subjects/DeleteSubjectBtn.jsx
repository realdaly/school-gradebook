import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TiDelete } from "react-icons/ti";
import deleteSubject from "@/utils/subjects/deleteSubject";

export default function DeleteSubjectBtn({currentSubject, getSubjects}){
    let [isOpen, setIsOpen] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await deleteSubject(currentSubject.id);
        await getSubjects();
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
            title={`هل أنت متأكد من حذف "${currentSubject.title}"؟`}
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