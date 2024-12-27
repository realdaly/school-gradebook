import { useEffect, useState } from "react";
import readStudents from "@/utils/classpage/readStudents";
import CreateStudentsBtn from "@/components/classpage/CreateStudentsBtn";
import GradeTable from "@/components/classpage/GradeTable";
import readSubjects from "@/utils/subjects/readSubjects";
import { useTheme } from "@/components/template/ConfigContext";

export default function StudentsMarks({classId, classLabel, isLiterary}){
    const { subjects } = useTheme();
    let [classSubjects, setClassSubjects] = useState([]);
    let [students, setStudents] = useState([]);    

    // filter subjects before passing them to GradeTable
    async function filterClassSubjects() {
        const filteredSubjects = subjects?.filter(
            subject => subject.is_literary == isLiterary
        );
        setClassSubjects(filteredSubjects);
    }

    async function getStudents(){
        const fetchedStudents = await readStudents(classId);
        setStudents(fetchedStudents);
    };

    useEffect(() => {
        filterClassSubjects();
        getStudents(setStudents);
    }, [subjects]);

    return(
        <div className="pb-5">
            <GradeTable
                subjects={classSubjects}
                students={students}
                getStudents={getStudents}
                classId={classId}
                classLabel={classLabel}
                isLiterary={isLiterary}
            />
            <CreateStudentsBtn 
                classId={classId}
                getStudents={getStudents}
            />
        </div>
    );
}