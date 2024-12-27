"use client";
import ClassCard from "@/components/homepage/ClassCard";

export default function ClassesComponent({classes, fetchClasses}){
    return(
        <div className="pb-5">
            {
                !classes || classes.length === 0 ?
                <div className="flex items-start justify-center p-5">القائمة فارغة!</div>
                :
                <>
                    <p className="font-bold text-2xl text-center">قائمة الصفوف</p>
                    <div className="flex items-start justify-center flex-wrap gap-x-5 gap-y-7 p-5">
                        {classes.map(item => (
                            <ClassCard 
                                key={item.id}
                                currentClass={item}
                                fetchClasses={fetchClasses}
                            />
                        ))}
                    </div>
                </>
            }
        </div> 
    );
}