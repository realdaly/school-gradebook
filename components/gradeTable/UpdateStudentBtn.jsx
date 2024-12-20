import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TbEditCircle } from "react-icons/tb";
import updateStudent from "@/utils/classpage/updateStudent";

export default function UpdateStudentBtn({currentStudent, getStudents, closeMenu}){
    let [isOpen, setIsOpen] = useState(false);
    let [studentName, setStudentName] = useState(currentStudent.name);

    const submitFunc = async () => {
        console.log(currentStudent);
        
        await updateStudent(studentName, currentStudent.id);
        await getStudents();
        setIsOpen(false);
        setStudentName(prev => prev);
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
            className="text-green-600 transition-all hover:opacity-75 flex justify-between w-full font-bold hover:bg-comp/50 px-2 py-1"
        >
            تـــعـــديـــــــل
            <TbEditCircle className="size-5" />
        </button>
        <Modal 
            title="تعديل معلومات الطالب"
            sumbitLabel="تــــــم"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
        >
            <form 
                className="flex flex-col items-center gap-3"
                onSubmit={e => {
                    e.preventDefault();
                    submitFunc();
                }}
            >
                <input 
                    placeholder="اسم الطالب"
                    className="py-1 px-4 bg-comp rounded-2xl w-72 border-accent1 border"
                    onChange={e => setStudentName(e.target.value)}
                    name="name"
                    value={studentName}
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}