import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TbEditCircle } from "react-icons/tb";
import updateClass from "@/utils/homepage/updateClass";

export default function UpdateClassBtn({currentClass}){
    let [isOpen, setIsOpen] = useState(false);
    let [className, setClassName] = useState(currentClass.title);
    let [classTheme, setClassTheme] = useState(currentClass.theme);

    const themes = [
        "theme1",
        "theme2",
        "theme3",
        "theme4",
        "theme5",
        "theme6",
        "theme7",
        "theme8",
        "theme9",
    ];

    const submitFunc = () => {
        setIsOpen(false);
        updateClass(className, classTheme, currentClass.id);
        setClassName(prev => prev);
        setClassTheme(prev => prev);
    }

    return(
    <>
        <button 
            title="تعديل" 
            onClick={() => setIsOpen(true)}
            className="px-1 text-zinc-600 transition-all hover:opacity-75"
        >
            <TbEditCircle className="size-6" />
        </button>
        <Modal 
            title="تعديل الصف"
            sumbitLabel="تــــــم"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
        >
            <form 
                className="flex flex-col items-center gap-3"
                onSubmit={e => {
                    e.preventDefault(),
                    submitFunc()
                }}
            >
                <input 
                    placeholder="اسم الصف"
                    className="py-1 px-4 bg-comp rounded-2xl w-72 border-accent1 border"
                    onChange={e => setClassName(e.target.value)}
                    name="title"
                    value={className}
                    data-autofocus
                />
                <div className="flex flex-wrap items-center">
                    {themes.map(theme => (
                        <div
                            className="px-1.5 cursor-pointer transition-all hover:opacity-75"
                            key={theme}
                            onClick={() => setClassTheme(theme)}
                        >
                            <div
                                className={`bg-${theme} size-5 rounded-full ${
                                    classTheme === theme ? "border-2 border-black" : ""
                                }`}
                            ></div>
                        </div>
                    ))}
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}