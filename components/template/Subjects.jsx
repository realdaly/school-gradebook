import DropdownMenu from "@/components/ui/DropdownMenu";
import readSubjects from "@/utils/subjects/readSubjects";
import { useEffect, useState } from "react";
import { ImBooks } from "react-icons/im";
import Button from "@/components/ui/Button";
import SubjectBtn from "@/components/subjects/SubjectBtn";
import createSubject from "@/utils/subjects/createSubject";
import Modal from "@/components/ui/Modal";

export default function Subjects(){
    let [subjects, setSubjects] = useState([]);

    let [isOpen, setIsOpen] = useState(false);
    let [subjectName, setSubjectName] = useState("");

    async function fetchSubjects(){
        const fetchedSubjects = await readSubjects();
        setSubjects(fetchedSubjects);
    };

    const submitFunc = async () => {
        setIsOpen(false);
        await createSubject(subjectName);
        await fetchSubjects();
        setSubjectName("");
    }

    useEffect(() => {
       fetchSubjects(setSubjects); 
    }, []);

    return(
        <>
            <DropdownMenu
                btn={
                    <Button
                        label="المواد الدراسية"
                        style="border"
                    >
                        <ImBooks className="size-5" />
                    </Button>
                }
            >
                {subjects.map(subject => (
                    <div 
                        key={subject.id}
                    >
                        <SubjectBtn  
                            currentSubject={subject}
                            fetchSubjects={fetchSubjects}
                        />
                    </div>
                ))}
                <p 
                    className="px-5 py-1 whitespace-nowrap transition-all text-xl bg-comp/30 hover:bg-comp hover:text-black cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    إضافة مادة +
                </p>
            </DropdownMenu>
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