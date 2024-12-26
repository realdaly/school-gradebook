import { useEffect, useState } from "react";
import { useTheme } from "@/components/template/ConfigContext";

export default function StudentTable({isLiterary}){
    const { subjects, terms, accentColor } = useTheme();
    let [marks, setMarks] = useState([]);
    let [classSubjects, setClassSubjects] = useState([]);

    // filter subjects according to the boolean value of isLiterary
    async function getClassSubjects() {
        const filteredSubjects = subjects?.filter(
            subject => subject.is_literary == isLiterary
        );
        setClassSubjects(filteredSubjects);
    }

    useEffect(() => {
        getClassSubjects();
    }, [subjects]);

    // async function getMarks(){
    //     const fetchedMarks = await readMarks(classId);        
    //     setMarks(fetchedMarks);
    // };
  
    return (
      <div className="w-fit max-w-4xl mx-auto p-4">
        <div className="flex flex-col w-fit">
          {/* Header row */}
          <div className="flex w-fit bg-comp rounded-t-2xl">
            <div className="w-32 p-2 border-b border-black/30 font-bold flex items-center justify-center">الدرس</div>
            {terms?.map(term =>
              <div key={term.id} className="p-2 border-r border-b border-black/30 relative h-28 w-16 flex items-center justify-center">
                <div className="text-center font-bold absolute bottom-0 left-14 origin-bottom-left -rotate-90 transform p-2 w-28 h-12 flex items-center justify-center">
                  {term.title}
                </div>
              </div>
            )}
          </div>
  
          {/* Subject rows */}
          {classSubjects.map((subject, index) => (
            <div key={index} className="flex w-fit">
              <div className="w-32 p-2 border-b border-r border-black/30 text-center font-bold">
                {subject.title}
            </div>
              {Array.from({ length: 8 }).map((_, colIndex) => (
                <div key={colIndex} className="p-2 border-r border-b last:border-l border-black/30 text-center w-16">
                  {/* Empty cells for grade input */}
                </div>
              ))}
            </div>
          ))}
  
          {/* Bottom fields */}
          <div className="flex border-l border-b border-black/30">
            <div className="w-32 bg-green-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الأول</div>
            
          </div>
          <div className="flex border-b border-l border-black/30">
            <div className="w-32 bg-red-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الثاني</div>
            
          </div>
        </div>
      </div>
    );
}  