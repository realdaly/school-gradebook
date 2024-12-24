import DropdownMenu from "@/components/ui/DropdownMenu";
import { useRef } from "react";
import RightClickMenu from "@/components/ui/RightClickMenu";
import { IoMdArrowDropdown } from "react-icons/io";
import DeleteAllTermMarks from "@/components/gradeTable/DeleteAllTermMarksBtn";

export default function TableHeader({accentColor, currentTerm, terms, setCurrentTerm, classId, getMarks}){
    const RightClickMenuTriggerRef = useRef(null);

    return(
        <div>
            <DropdownMenu
                btn={
                    <div 
                        ref={RightClickMenuTriggerRef}
                        className={`bg-${accentColor} text-white px-2 py-1 text-center font-bold text-lg border-b border-black/30 rounded-t-2xl flex items-center justify-center`}
                    >
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

                <RightClickMenu triggerRef={RightClickMenuTriggerRef}>
                    <DeleteAllTermMarks 
                        classId={classId}
                        currentTerm={currentTerm?.mark_ref}
                        getMarks={getMarks}
                    />
              </RightClickMenu>
        </div>
    );
}