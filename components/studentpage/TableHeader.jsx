import { useState } from "react";
import DeleteAllStudentMarks from "@/components/studentpage/DeleteAllStudentMarks";

export default function TableHeader({studentId, getStudentMarks, terms, emptyAllMenu, setEmptyAllMenu, setMarkMenu}){
    
    const [menuPosition, setMenuPosition] = useState();
  
    const handleEmptyAllMenu = (e) => {        
      e.preventDefault();
      setMarkMenu(false);
      setEmptyAllMenu(true);
      setMenuPosition({x: e.pageX, y: e.pageY});
    };

    return(
      <>
        <div className="flex w-fit bg-comp rounded-t-2xl">
            <div 
              onContextMenu={e => handleEmptyAllMenu(e)}
              className="w-32 p-2 border-b border-black/30 font-bold flex items-center justify-center"
            >
              الدرس
            </div>
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
        {/* mark right click menu */}
        {emptyAllMenu && (
            <div
                className="absolute z-10 mr-8"
                style={{
                    top: `${menuPosition.y}px`,
                    left: `${menuPosition.x}px`,
                }}
            >
                <div className="absolute bg-white border border-black shadow-md rounded-md min-w-28">
                    <DeleteAllStudentMarks
                      getMarks={getStudentMarks}
                      studentId={studentId}
                      setEmptyAllMenu={setEmptyAllMenu}
                    />
                </div>
            </div>
        )}
      </>
    );
}