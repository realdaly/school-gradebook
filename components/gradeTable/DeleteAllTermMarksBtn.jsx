import { BsEraserFill } from "react-icons/bs";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import deleteAllTermMarks from "@/utils/marks/deleteAllTermMarks";

export default function DeleteAllTermMarks({currentTerm, classId, getMarks}){
    const [isOpen, setIsOpen] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await deleteAllTermMarks(currentTerm, classId)
        await getMarks();
    }
    
    return(
        <>
            <button
                onClick={e => {
                    e.stopPropagation(); // Prevent the parent click event
                    setIsOpen(true);
                }}
                className="text-green-600 transition-all hover:opacity-75 flex justify-between w-full font-bold hover:bg-comp/50 px-2 py-1"
            >
                إفراغ جميع الحقول
                <BsEraserFill className="size-5" />
            </button>
            <Modal 
                title={`هل أنت متأكد من رغبتك في حذف جميع الدرجات؟`}
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