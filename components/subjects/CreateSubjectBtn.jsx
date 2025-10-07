"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createSubject from "@/utils/subjects/createSubject";
import Button from "@/components/ui/Button";

export default function CreateSubjectBtn({getSubjects}){
    const [isOpen, setIsOpen] = useState(false);

    const [subjectName, setSubjectName] = useState("");
    const [category, setCategory] = useState("scientific");

    const submitFunc = async () => {
        setIsOpen(false);
        await createSubject(subjectName, category);
        await getSubjects();
        setSubjectName("");
        setCategory("");
    }

    return(
    <>
        <Button
            label="إضافة +"
            setFunc={setIsOpen}
            style="mx-auto !py-0 font-normal !text-lg"
            title="انقر لإضافة مادة جديدة"
        />
        <Modal 
            title="إضافة مادة"
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
                    placeholder="اسم المادة"
                    className="py-1 px-4 bg-comp rounded-2xl w-72 border-accent1 border"
                    onChange={e => setSubjectName(e.target.value)}
                    name="title"
                    value={subjectName}
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