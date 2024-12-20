import readTermMarks from "@/utils/marks/readTermMarks";
import { useEffect, useState } from "react";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { IoMdArrowDropdown } from "react-icons/io";
import readTerms from "@/utils/terms/readTerms";
import { useTheme } from "@/components/template/ConfigContext";

export default function GradeTable({students, subjects, classId}){
    const { accentColor } = useTheme();
    let [terms, setTerms] = useState([]);
    let [termMarks, setTermMarks] = useState([]);
    let [currentTerm, setCurrentTerm] = useState();

    async function getTerms(){
        const fetchedTerms = await readTerms();
        setCurrentTerm(fetchedTerms[0])
        setTerms(fetchedTerms);
    };

    async function getTermMarks(){
        const fetchedMarks = await readTermMarks(classId);        
        setTermMarks(fetchedMarks);
    };

    useEffect(() => {
        getTermMarks();
    }, [currentTerm]);

    useEffect(() => {
        getTerms();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto py-4 overflow-x-auto">
            <div className="inline-block min-w-full">
                {/* Header */}
                <DropdownMenu
                    btn={
                        <div className={`bg-${accentColor} text-white px-2 py-1 text-center font-bold text-lg border-b border-black/30 rounded-t-2xl flex items-center justify-center`}>
                            {currentTerm?.title}
                            <IoMdArrowDropdown />
                        </div>
                    }
                    menuStyle="right-0 left-0 text-center rounded-b-2xl"
                >
                    {terms?.map(term => (
                        <div 
                            key={term.id}
                        >
                            <p
                                className="py-1 cursor-pointer transition-all hover:bg-comp border-domI/20 border-b hover:text-black text-lg" 
                                onClick={() => setCurrentTerm(term)}
                            >
                                    {term.title}
                                </p>
                        </div>
                    ))}
                </DropdownMenu>
                
                {/* Subjects Header */}
                <div className="flex bg-comp text-center border border-b-0 border-t-0 border-black/30">
                    <div className="w-8 border-l border-black/30 flex-shrink-0"></div>
                    <div className="min-w-[195px] max-w-[195px] overflow-clip flex-shrink-0"></div>
                    <div className="flex-1 px-2 border-b border-r text-lg font-bold border-black/30">المواد الدراسية</div>
                </div>
                
                {/* Subjects */}
                <div className="flex bg-comp text-center border-x border-b border-black/30">
                    <div className="w-8 border-l text-base font-bold border-black/30">ت</div>
                    <div className="min-w-[195px] max-w-[195px] overflow-clip px-2 py-1 text-base font-bold whitespace-nowrap">اسم الطالب</div>
                    {subjects?.map(subject => (
                        <div 
                            key={subject.id} 
                            className="min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-base font-bold whitespace-nowrap"
                        >
                            {subject.title}
                        </div>
                    ))}
                </div>
                
                {/* Students and Grades */}
                {students?.map((student, studentIndex) => (
                    <div key={studentIndex} className="flex odd:bg-domI border-x border-b border-black/30 last:rounded-b-2xl">
                        <div className="w-8 px-1 py-1 text-center">{studentIndex + 1}</div>
                        <div 
                            title={student.name}
                            className="min-w-[195px] max-w-[195px] overflow-clip px-2 py-1 border-r border-black/30 text-right whitespace-nowrap flex-shrink-0"
                        >
                            {student.name}
                        </div>
                        {subjects.map((subject, gradeIndex) => {
                            // Find the mark for the specific student and subject
                            const mark = termMarks.find(
                                (termMark) =>
                                    termMark.student_id === student.id && 
                                    termMark.subject_id === subject.id
                            );

                            // rounding marks to get rid of decimals
                            const markValue = mark ? Math.round(mark[currentTerm?.mark_ref] ?? 0) : "";

                            return (
                                <div
                                    key={gradeIndex}
                                    className="min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-center"
                                >
                                    {markValue}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
  }
  