import { useEffect, useState } from "react";
import { useTheme } from "@/components/template/ConfigContext";
import readStudentMarks from "@/utils/studentpage/readStudentMarks";
import readStudent from "@/utils/studentpage/readStudent";

export default function StudentTable({isLiterary, studentId}){
    const { subjects, terms } = useTheme();
    let [studentInfo, setStudentInfo] = useState();
    let [studentMarks, setStudentMarks] = useState([]);
    let [classSubjects, setClassSubjects] = useState([]);

    // fetch class subjects based on the isLiterary flag
    async function getClassSubjects() {
        const filteredSubjects = subjects?.filter(
            subject => subject.is_literary == isLiterary
        );
        setClassSubjects(filteredSubjects);
    }

    async function getStudentInfo(){
      const fetchedInfo = await readStudent(studentId);
      setStudentInfo(fetchedInfo[0] || "");
    };

    async function getStudentMarks(){
      const fetchedMarks = await readStudentMarks(studentId);
      setStudentMarks(fetchedMarks);
    };

  // function to find a mark based on subject and term
  const getMarkForSubjectAndTerm = (subjectId, markRef) => {
    const markEntry = studentMarks.find(
      (mark) => mark.subject_id == subjectId
    );
    return markEntry ? markEntry[markRef] : null;
  };

    useEffect(() => {
        getClassSubjects();
        getStudentInfo();
        getStudentMarks();
    }, [subjects]);
  
    return (
      <div 
        id="GradeTable"
        className="w-fit max-w-4xl mx-auto p-4"
      >
        <div className="flex flex-col w-fit">
          {/* Header row */}
          <div className="flex w-fit bg-comp rounded-t-2xl">
            <div className="w-32 p-2 border-b border-black/30 font-bold flex items-center justify-center">الدرس</div>
            {terms?.map(term =>
              <div 
                key={term?.id} 
                className="p-2 border-r border-b border-black/30 relative h-28 w-16 flex items-center justify-center"
              >
                <div className="text-center font-bold absolute bottom-0 left-14 origin-bottom-left -rotate-90 transform p-2 w-28 h-12 flex items-center justify-center">
                  {term?.title}
                </div>
              </div>
            )}
          </div>
  
          {/* Subject rows */}
          {classSubjects.map(subject => (
            <div 
              key={subject?.id} 
              className="flex w-fit"
            >
              {/* Subject title */}
              <div className="w-32 p-2 border-b border-r border-black/30 text-center font-bold">
                {subject?.title}
              </div>
              {/* Marks for each term */}
              {terms?.map(term => (
                <div
                  key={term?.id}
                  className="p-2 border-r border-b last:border-l border-black/30 text-center w-16"
                >
                  {getMarkForSubjectAndTerm(subject?.id, term?.mark_ref) || ""}
                </div>
              ))}
            </div>
          ))}
  
          {/* Bottom fields */}
          <div className="flex border-l border-b border-black/30">
            <div className="w-32 bg-green-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الأول</div>
            <div className="px-2 flex items-center">{studentInfo?.first_try_result}</div>
          </div>
          <div className="flex border-b border-l border-black/30">
            <div className="w-32 bg-red-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الثاني</div>
            <div className="px-2 flex items-center">{studentInfo?.second_try_result}</div>
          </div>
        </div>
      </div>
    );
}  