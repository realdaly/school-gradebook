import DeleteSubjectBtn from "@/components/subjects/DeleteSubjectBtn";
import UpdateSubjectBtn from "@/components/subjects/UpdateSubjectBtn";

export default function SubjectItem({currentSubject, fetchSubjects}){
    return(
        <div 
            className="px-4 py-1 even:bg-domI text-lg hover:text-black cursor-default flex items-center gap-x-3"
        >
            <div
                className="w-36 line-clamp-1"
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