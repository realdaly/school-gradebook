import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TbEditCircle } from "react-icons/tb";
import updateTerm from "@/utils/terms/updateTerm";

export default function UpdateTermBtn({currentTerm, getTerms, isOpen, setIsOpen}){
    let [termTitle, setTermTitle] = useState(currentTerm.title);

    const submitFunc = async () => {
        await updateTerm(termTitle, currentTerm.id);
        await getTerms();
        setIsOpen(false);
        setTermTitle(prev => prev);
    }

    return(
    <>
        <button 
            title="تعديل" 
            onClick={() => setIsOpen(true)}
            className="px-1 text-green-600"
        >
            <TbEditCircle className="size-5" />
        </button>
        <Modal 
            title="تعديل العنوان"
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
                    placeholder="عنوان الحقل"
                    className="py-1 px-4 bg-comp rounded-2xl w-72 border-accent1 border"
                    onChange={e => setTermTitle(e.target.value)}
                    name="title"
                    value={termTitle}
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}