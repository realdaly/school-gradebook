import { useState } from "react";
import { ImBooks } from "react-icons/im";
import Button from "@/components/ui/Button";
import SubjectItem from "@/components/subjects/SubjectItem";
import Modal from "@/components/ui/Modal";
import CreateSubjectBtn from "@/components/subjects/CreateSubjectBtn";
import { useTheme } from "@/components/template/ConfigContext";

export default function Subjects(){
    const { subjects, getSubjects } = useTheme();
    let [isOpen, setIsOpen] = useState(false);

    const scientificSubjects = subjects?.filter(subject => subject.is_literary == "false");
    const literarySubjects = subjects?.filter(subject => subject.is_literary == "true");

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
                    {renderSubjectsContainer("مواد العلمي", scientificSubjects, getSubjects)}
                    {renderSubjectsContainer("مواد الأدبي", literarySubjects, getSubjects)}
                </div>
                <CreateSubjectBtn 
                    getSubjects={getSubjects}
                />
            </Modal>
        </>
    );
}

function renderSubjectsContainer(title, filteredSubjects, getSubjects){
    return(
        <div>
            <p className="text-xl text-center">{title}</p>
            <div className="bg-comp rounded-2xl border-accent1 border overflow-clip">
                {filteredSubjects?.length == 0 && 
                    <p className="w-60 text-center py-1">القائمة فارغة.</p>
                }
                {filteredSubjects?.map(subject => (
                    <SubjectItem  
                        key={subject.id}
                        currentSubject={subject}
                        getSubjects={getSubjects}
                    />
                ))}
            </div>
        </div>
    );
}