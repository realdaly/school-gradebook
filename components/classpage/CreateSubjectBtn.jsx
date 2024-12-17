import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import createSubject from "@/utils/classpage/createSubject";
import { IoMdArrowDropdown } from "react-icons/io";
import DropdownMenu from "@/components/ui/DropdownMenu";

export default function CreateSubjectBtn({subjects, fetchSubjects}){
    let [isOpen, setIsOpen] = useState(false);
    let [subjectName, setSubjectName] = useState("");

    const submitFunc = async () => {
        setIsOpen(false);
        await createSubject(subjectName);
        await fetchSubjects();
        setSubjectName("");
    }

    return(
    <>
        {subjects?.length > 0 ?
            <DropdownMenu
                btn={
                    <Button
                        label={subjects[0].name}
                    >
                        <IoMdArrowDropdown />
                    </Button>
                }
            >
                {subjects.map(subject => (
                    <p 
                        className="px-5 py-1 first:pt-2 transition-all hover:bg-comp hover:text-black cursor-pointer"
                        key={subject.id}
                    >
                        {subject.name}
                    </p>
                ))}
                <p 
                    className="px-5 py-1 transition-all hover:bg-comp hover:text-black cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    إضافة مادة +
                </p>
            </DropdownMenu>
        :
            <Button
                setFunc={setIsOpen}
                label="إضافة مادة +"
            />
        }
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
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}