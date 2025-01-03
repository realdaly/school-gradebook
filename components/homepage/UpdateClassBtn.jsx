import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TbEditCircle } from "react-icons/tb";
import updateClass from "@/utils/homepage/updateClass";
import { themes } from "@/data/themes";

export default function UpdateClassBtn({currentClass, fetchClasses}){
    let [isOpen, setIsOpen] = useState(false);
    let [className, setClassName] = useState(currentClass.title);
    let [classTheme, setClassTheme] = useState(currentClass.theme);
    let [isLiterary, setIsLiterary] = useState(currentClass.is_literary == "false" ? false : true);

    const submitFunc = async () => {
        setIsOpen(false);
        await updateClass(className, classTheme, isLiterary, currentClass.id);
        await fetchClasses();
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
            <TbEditCircle className="size-7" />
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
                {/* theme settings for selecting prefered theme from themes array */}
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