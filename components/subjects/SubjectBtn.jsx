import DeleteSubjectBtn from "@/components/subjects/DeleteSubjectBtn";
import UpdateSubjectBtn from "@/components/subjects/UpdateSubjectBtn";

export default function SubjectBtn({currentSubject, fetchSubjects}){
    return(
        <div 
            className="pr-5 pl-3 py-1 text-xl first:pt-2 transition-all hover:bg-comp hover:text-black cursor-default flex items-center gap-x-3"
        >
            <div
                className="w-40 line-clamp-1"
            >
                {currentSubject.title}
            </div>
            <div className="flex items-center">
                <UpdateSubjectBtn 
                    currentSubject={currentSubject}
                    fetchSubjects={fetchSubjects}
                />
                <DeleteSubjectBtn
                    currentSubject={currentSubject}
                    fetchSubjects={fetchSubjects}
                />
            </div>
        </div>
    );
}