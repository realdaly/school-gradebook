import { useState } from "react";
import Modal from "@/components/ui/Modal";
import deleteClass from "@/utils/homepage/deleteClass";
import { TiDelete } from "react-icons/ti";

export default function DeleteClassBtn({currentClass}){
    let [isOpen, setIsOpen] = useState(false);

    const submitFunc = () => {
        setIsOpen(false);
        deleteClass(currentClass.id);
    }

    return(
    <>
        <button 
            onClick={() => setIsOpen(true)}
            title="حذف"
            className="px-1 text-danger transition-all hover:opacity-75"
        >
            <TiDelete className="size-7" />
        </button>
        <Modal 
            title={`هل أنت متأكد من حذف "${currentClass.title}"؟`}
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