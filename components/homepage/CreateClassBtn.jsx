"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createClass from "@/utils/homepage/createClass";
import Button from "@/components/ui/Button";
import { themes } from "@/data/themes";

export default function CreateClassBtn({fetchClasses}){
    const [isOpen, setIsOpen] = useState(false);
    const [className, setClassName] = useState("");
    const [classTheme, setClassTheme] = useState("theme1");
    const [category, setCategory] = useState("");

    const submitFunc = async () => {
        setIsOpen(false);
        await createClass(className, classTheme, category);
        await fetchClasses();
        setClassName("");
        setClassTheme("theme1");
        setCategory("");
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