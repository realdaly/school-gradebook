import { useEffect, useState } from "react";
import { useTheme } from "@/components/template/ConfigContext";
import readMarks from "@/utils/marks/readMarks";
import TableHeader from "@/components/gradeTable/TableHeader";
import SubjectsRow from "@/components/gradeTable/SubjectsRow";
import StudentsAndGrades from "@/components/gradeTable/StudentsAndGrades";

export default function GradeTable({students, subjects, getStudents, classId, classLabel, isLiterary}){
    const { terms, accentColor } = useTheme();
    let [marks, setMarks] = useState([]);
    let [currentTerm, setCurrentTerm] = useState(terms && terms[0]);

    async function getMarks(){
        const fetchedMarks = await readMarks(classId);        
        setMarks(fetchedMarks);
    };

    useEffect(() => {
        getMarks();
    }, [currentTerm]);


    // on terms change set currentTerm to updated term value from the newly changed terms
    useEffect(() => {
        setCurrentTerm(prev => terms.find(term => term.id == prev.id));
    }, [terms])

    return (
        <div 
            id="GradeTable"
            className="w-full max-w-7xl mx-auto py-4 overflow-x-auto"
        >
            <div className="inline-block min-w-full">
                <TableHeader 
                    accentColor={accentColor}
                    currentTerm={currentTerm}
                    setCurrentTerm={setCurrentTerm}
                    terms={terms}
                    classId={classId}
                    getMarks={getMarks}
                />
                {/* Subjects Header */}
                <div className="flex bg-comp text-center border border-b-0 border-t-0 border-black/30">
                    <div className="w-8 border-l border-black/30 flex-shrink-0"></div>
                    <div className="min-w-[195px] max-w-[195px] overflow-clip flex-shrink-0"></div>
                    <div className="flex-1 px-2 border-b border-r text-lg font-bold border-black/30">المواد الدراسية</div>
                </div>
                <SubjectsRow 
                    subjects={subjects}
                />
                <StudentsAndGrades 
                    currentTerm={currentTerm}
                    marks={marks}
                    students={students}
                    subjects={subjects}
                    getStudents={getStudents}
                    getMarks={getMarks}
                    classId={classId}
                    classLabel={classLabel}
                    isLiterary={isLiterary}
                />             
            </div>
        </div>
    )
  }
  