import { useEffect, useState } from "react";
import readStudents from "@/utils/classpage/readStudents";
import CreateStudentsBtn from "@/components/classpage/CreateStudentsBtn";
import GradeTable from "@/components/classpage/GradeTable";
import readSubjects from "@/utils/subjects/readSubjects";

export default function StudentsMarks({classId, isLiterary}){
    let [subjects, setSubjects] = useState([]);
    let [students, setStudents] = useState([]);    

    // filter subjects before passing them to GradeTable
    async function getSubjects() {
        const fetchedSubjects = await readSubjects();
        const filteredSubjects = fetchedSubjects.filter(
            subject => subject.is_literary == isLiterary
        );
        setSubjects(filteredSubjects);
    }

    async function getStudents(){
        const fetchedStudents = await readStudents(classId);
        setStudents(fetchedStudents);
    };

    useEffect(() => {
        getSubjects();
        getStudents(setStudents);
    }, []);

    return(
        <>
            <div>
                <GradeTable
                    subjects={subjects}
                    students={students}
                    getStudents={getStudents}
                    classId={classId}
                />
            </div>
            <CreateStudentsBtn 
                classId={classId}
                getStudents={getStudents}
            />
        </>
    );
}