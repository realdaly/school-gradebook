import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TbEditCircle } from "react-icons/tb";
import updateSubject from "@/utils/subjects/updateSubject";

export default function UpdateSubjectBtn({currentSubject, getSubjects}){
    const [isOpen, setIsOpen] = useState(false);
    const [subjectTitle, setSubjectTitle] = useState(currentSubject.title);
    const [category, setCategory] = useState(currentSubject.category);

    const submitFunc = async () => {
        await updateSubject(subjectTitle, category, currentSubject.id);
        await getSubjects();
        setIsOpen(false);
        setSubjectTitle(prev => prev);
        setCategory("");
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
                {/* radio buttons for selecting "علمي" ,"أدبي" or "متوسط" */}
                <div className="flex items-center">
                    <label className="flex items-center gap-2 px-4 pt-2 cursor-pointer text-xl transition-all hover:opacity-75">
                        <input
                            className="cursor-pointer"
                            type="radio"
                            name="category"
                            checked={category == "scientific"}
                            onChange={() => setCategory("scientific")}
                        />
                        علمي
                    </label>
                    <label className="flex items-center gap-2 px-4 pt-2 cursor-pointer text-xl transition-all hover:opacity-75">
                        <input
                            className="cursor-pointer"
                            type="radio"
                            name="category"
                            checked={category == "literary"}
                            onChange={() => setCategory("literary")}
                        />
                        أدبي
                    </label>
                    <label className="flex items-center gap-2 px-4 pt-2 cursor-pointer text-xl transition-all hover:opacity-75">
                        <input
                            className="cursor-pointer"
                            type="radio"
                            name="category"
                            checked={category == "mid"}
                            onChange={() => setCategory("mid")}
                        />
                        متوسط
                    </label>
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}