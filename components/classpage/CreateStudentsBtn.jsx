"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import createMultipleStudents from "@/utils/classpage/createMultipleStudents";

export default function CreateStudentsBtn({classId, getStudents}){
    let [isOpen, setIsOpen] = useState(false);
    const [studentNames, setStudentNames] = useState("");

    const submitFunc = async () => {
        setIsOpen(false);
        await createMultipleStudents(studentNames, classId);
        await getStudents();
    }

    return(
    <>
        <Button 
            label="إضافة طلاب +"
            title="انقر لإضافة مجموعة طلاب"
            setFunc={setIsOpen}
        />
        <Modal 
            title="إضافة طلاب"
            desc="ملاحظة/ يجب فصل أسماء الطلاب كل اسم على سطر جديد."
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
                <textarea 
                    placeholder="أدخل أسماء الطلاب"
                    className="p-4 bg-comp rounded-2xl"
                    onChange={e => setStudentNames(e.target.value)}
                    name="names"
                    rows="5"
                    cols="40"
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}