"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createSubject from "@/utils/subjects/createSubject";
import Button from "@/components/ui/Button";

export default function CreateSubjectBtn({fetchSubjects}){
    let [isOpen, setIsOpen] = useState(false);

    let [subjectName, setSubjectName] = useState("");
    let [isLiterary, setIsLiterary] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await createSubject(subjectName, isLiterary);
        await fetchSubjects();
        setSubjectName("");
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