import getMarkForSubjectAndTerm from "@/utils/classpage/getMarkForSubjectAndTerm";
import { useState } from "react";
import SuccessAlert from "@/components/template/SuccessAlert";
import updateMarks from "@/utils/marks/updateMarks";
import handleMarkInput from "@/utils/handleMarkInput";
// import DeleteCurrentMarkBtn from "../gradeTable/DeleteCurrentMarkBtn";

export default function TableBody({classSubjects, terms, studentMarks, getStudentMarks}){
  const [isAlert, setIsAlert] = useState(false);
  const [mark, setMark] = useState();

  // const [markMenu, setMarkMenu] = useState(false);
  // const [menuPosition, setMenuPosition] = useState();

  // const handleMarkMenu = (e, mark) => {        
  //   e.preventDefault();
  //   setMarkMenu(true);
  //   setMenuPosition({x: e.pageX, y: e.pageY});
  //   setMark(mark);
  // };

  const changeMark = async (event, term, currentMark) => {        
    event.preventDefault();
    await updateMarks([term?.mark_ref], mark, currentMark);
    await getStudentMarks();
    setMark("");
    setIsAlert(true);
  }

  return(
    <>
        {classSubjects?.map(subject => (
        <div 
            className="flex w-fit"
            key={subject.id}
        >
            {/* Subject title */}
            <div className="w-32 p-2 border-b border-r border-l border-black/30 text-center font-bold">
                {subject.title}
            </div>
            {/* Marks for each term for this subject */}
            {terms?.map((term, gradeIndex) => {            
            // round mark value before displaying it if there's value, else return empty string
            const currentMark = getMarkForSubjectAndTerm(studentMarks, subject.id);
            
            const markValue = currentMark && currentMark[term?.mark_ref] != null 
            ? Math.round(currentMark[term?.mark_ref]) 
            : "";

            // render non-editable field if mark is not supposed to be edited manually
            if (
                term?.mark_ref === "average_mark" ||
                term?.mark_ref === "final_mark" ||
                term?.mark_ref === "final_mark_after_second_try"
            ){
                return(
                <div 
                    key={gradeIndex}
                    className="p-2 border-b border-l border-black/30 text-center w-16"
                >
                    {markValue}
                </div>
                )
            } else {
                // render edit form if there's a mark already
                if(currentMark){
                return (
                    // <form
                    //     key={gradeIndex}
                    //     onSubmit={e => changeMark(e, currentMark?.id)}
                    //     onContextMenu={e => handleMarkMenu(e, currentMark?.id)}
                    // >
                    //     <input
                    //         type="text"
                    //         maxLength={3}
                    //         onKeyDown={e => handleMarkInput(e, setMark)}
                    //         placeholder={markValue}
                    //         className={`min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-center placeholder:text-black cursor-cell ${markValue != "" && markValue < 50 ? "bg-danger/40" : ""}`}
                    //     />
                    // </form>
                    <form 
                        key={gradeIndex}
                        onSubmit={e => changeMark(e, term, currentMark?.id)}
                    >
                        <input
                            type="text"
                            maxLength={3}
                            onKeyDown={e => handleMarkInput(e, setMark)}
                            placeholder={markValue}
                            className={`p-2 border-b last:border-l border-black/30 text-center w-16 placeholder:text-black cursor-cell ${markValue != "" && markValue < 50 ? "bg-danger/40" : ""}`}
                        />
                    </form>
                );
                } else {
                    return(
                        // <form
                        //     key={gradeIndex}
                        //     onSubmit={e => addMark(e, subject.id, student.id)}
                        //     onContextMenu={e => handleMarkMenu(e, currentMark?.id)}
                        // >
                        //     <input
                        //         type="text"
                        //         maxLength={3}
                        //         onKeyDown={e => handleMarkInput(e, setMark)}
                        //         placeholder={markValue}
                        //         className="min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-center placeholder:text-black cursor-cell"
                        //     />
                        // </form>
                        <p key={gradeIndex}>asd</p>
                    );
                }
            }
            })}
        </div>
        ))}
        <SuccessAlert
            isVisible={isAlert}
            setIsVisible={setIsAlert}
            message="تم"
        />
    </>
  );
}