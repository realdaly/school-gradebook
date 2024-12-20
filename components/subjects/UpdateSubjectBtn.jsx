import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TbEditCircle } from "react-icons/tb";
import updateSubject from "@/utils/subjects/updateSubject";

export default function UpdateSubjectBtn({currentSubject, fetchSubjects}){
    let [isOpen, setIsOpen] = useState(false);
    let [subjectTitle, setSubjectTitle] = useState(currentSubject.title);
    let [isLiterary, setIsLiterary] = useState(currentSubject.is_literary == "false" ? false : true);

    const submitFunc = async () => {
        await updateSubject(subjectTitle, isLiterary, currentSubject.id);
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
                {/* radio buttons for selecting "علمي" or "أدبي" */}
                <div className="flex items-center">
                    <label className="flex items-center gap-2 px-4 pt-2 cursor-pointer text-xl transition-all hover:opacity-75">
                        <input
                            type="radio"
                            name="is_literary"
                            value="false"
                            checked={!isLiterary}
                            onChange={() => setIsLiterary(false)}
                        />
                        علمي
                    </label>
                    <label className="flex items-center gap-2 px-4 pt-2 cursor-pointer text-xl transition-all hover:opacity-75">
                        <input
                            type="radio"
                            name="is_literary"
                            value="true"
                            checked={isLiterary}
                            onChange={() => setIsLiterary(true)}
                        />
                        أدبي
                    </label>
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}