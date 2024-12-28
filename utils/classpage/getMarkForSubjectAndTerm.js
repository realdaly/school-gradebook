export default function getMarkForSubjectAndTerm(studentMarks, subjectId){
    const mark = studentMarks.find(mark => 
        mark?.subject_id == subjectId
    );
    
    return mark ?? null;
}