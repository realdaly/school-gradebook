import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TbEditCircle } from "react-icons/tb";
import updateSubject from "@/utils/subjects/updateSubject";

export default function UpdateSubjectBtn({currentSubject, fetchSubjects}){
    let [isOpen, setIsOpen] = useState(false);
    let [subjectTitle, setSubjectTitle] = useState(currentSubject.title);

    const submitFunc = async () => {
        await updateSubject(subjectTitle, currentSubject.id);
        await fetchSubjects();
        setIsOpen(false);
        setSubjectTitle(prev => prev);
    }

    return(
    <>
        <button 
            title="تعديل" 
            onClick={() => setIsOpen(true)}
            className="px-1 text-green-600 transition-all hover:opacity-75"
        >
            <TbEditCircle className="size-6" />
        </button>
        <Modal 
            title="تعديل المادة"
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
                    placeholder="اسم المادة"
                    className="py-1 px-4 bg-comp rounded-2xl w-72 border-accent1 border"
                    onChange={e => setSubjectTitle(e.target.value)}
                    name="title"
                    value={subjectTitle}
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}