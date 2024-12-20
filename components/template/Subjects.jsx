import readSubjects from "@/utils/subjects/readSubjects";
import { useEffect, useState } from "react";
import { ImBooks } from "react-icons/im";
import Button from "@/components/ui/Button";
import SubjectItem from "@/components/subjects/SubjectItem";
import Modal from "@/components/ui/Modal";
import CreateSubjectBtn from "@/components/subjects/CreateSubjectBtn";

export default function Subjects(){
    let [subjects, setSubjects] = useState([]);
    let [isOpen, setIsOpen] = useState(false);

    async function fetchSubjects(){
        const fetchedSubjects = await readSubjects();
        setSubjects(fetchedSubjects);
    };

    const scientificSubjects = subjects.filter(subject => subject.is_literary == "false");
    const literarySubjects = subjects.filter(subject => subject.is_literary == "true");

    useEffect(() => {
       fetchSubjects(setSubjects); 
    }, []);

    return(
        <>
            
            <Button
                label="المواد الدراسية"
                setFunc={setIsOpen}
            >
                <ImBooks className="size-5" />
            </Button>
            <Modal 
                title="الــمـــــواد الــدراســيـــــــــــة"
                sumbitLabel="تــــــــم"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                submitFunc={() => setIsOpen(false)}
            >
                <div className="flex items-start justify-between gap-x-10">
                    {renderSubjectsContainer("مواد العلمي", scientificSubjects, fetchSubjects)}
                    {renderSubjectsContainer("مواد الأدبي", literarySubjects, fetchSubjects)}
                </div>
                <CreateSubjectBtn 
                    fetchSubjects={fetchSubjects}
                />
            </Modal>
        </>
    );
}

function renderSubjectsContainer(title, filteredSubjects, fetchSubjects){
    return(
        <div>
            <p className="text-xl text-center">{title}</p>
            <div className="bg-comp rounded-2xl border-accent1 border overflow-clip">
                {filteredSubjects?.length == 0 && 
                    <p className="w-60 text-center py-1">القائمة فارغة.</p>
                }
                {filteredSubjects.map(subject => (
                    <SubjectItem  
                        key={subject.id}
                        currentSubject={subject}
                        fetchSubjects={fetchSubjects}
                    />
                ))}
            </div>
        </div>
    );
}