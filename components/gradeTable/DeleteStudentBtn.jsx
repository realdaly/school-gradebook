import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TiDelete } from "react-icons/ti";
import deleteStudent from "@/utils/classpage/deleteStudent";

export default function DeleteStudentBtn({currentStudent, getStudents, closeMenu}){
    let [isOpen, setIsOpen] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await deleteStudent(currentStudent.id)
        await getStudents();
        // close right click menu when changes are finished
        closeMenu();
    }

    return(
    <>
        <button 
             onClick={e => {
                e.stopPropagation(); // Prevent the parent click event
                setIsOpen(true);
            }}
            className="text-danger transition-all hover:opacity-75 flex justify-between w-full font-bold hover:bg-comp/50 px-2 py-1"
        >
            حـــــــذف
            <TiDelete className="size-6" />
        </button>
        <Modal 
            title={`هل أنت متأكد من حذف "${currentStudent.name}"؟`}
            desc="لا يمكن التراجع عن هذه الخطوة!"
            sumbitLabel="حذف"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
            isDanger={true}
            close={closeMenu}
        />
    </>
    );
}