import { BsEraserFill } from "react-icons/bs";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import emptyAllStudentMarks from "@/utils/studentpage/emptyAllStudentMarks";

export default function DeleteAllStudentMarks({studentId, getMarks, setEmptyAllMenu}){
    const [isOpen, setIsOpen] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await emptyAllStudentMarks(studentId);
        await getMarks();
        setEmptyAllMenu(false);
    }
    
    return(
        <>
            <button
                onClick={e => {
                    e.stopPropagation(); // Prevent the parent click event
                    setIsOpen(true);
                }}
                className="text-green-600 transition-all hover:opacity-75 flex justify-between gap-x-1 font-bold hover:bg-comp/50 px-2 py-1 w-max"
            >
                إفراغ جميع حقول الدرجات
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