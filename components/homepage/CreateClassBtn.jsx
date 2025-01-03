"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createClass from "@/utils/homepage/createClass";
import Button from "@/components/ui/Button";
import { themes } from "@/data/themes";

export default function CreateClassBtn({fetchClasses}){
    let [isOpen, setIsOpen] = useState(false);
    let [className, setClassName] = useState("");
    let [classTheme, setClassTheme] = useState("theme1");
    let [isLiterary, setIsLiterary] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await createClass(className, classTheme, isLiterary);
        await fetchClasses();
        setClassName("");
        setClassTheme("theme1");
        setIsLiterary(false);
    }

    return(
    <>
        <Button 
            label="إضافة صف +"
            title="انقر لإضافة صف جديد"
            setFunc={setIsOpen}
            style="mx-auto" 
        />
        <Modal 
            title="إضافة صف"
            sumbitLabel="إضافة"
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