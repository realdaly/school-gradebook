import Database from "@tauri-apps/plugin-sql";
import { useEffect, useState } from "react";
import ClassCard from "@/components/ui/ClassCard";

export default function Classes(){
    const [data, setData] = useState([]);

    // function to get all classes with the num of related students
    const getClasses = async () => {
        const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
        const classes = await db.select(`
            SELECT 
            class.id, 
            class.title, 
            class.theme, 
            COUNT(students.id) AS student_count 
            FROM 
                class
            LEFT JOIN 
                students 
            ON 
                class.id = students.class_id 
            GROUP BY 
                class.id
        `);
        setData(classes);
    }

    useEffect(() => {
       getClasses(); 
    });

    if (!data || data.length === 0) {
        return <div className="flex items-start justify-center p-5">القائمة فارغة!</div>;
    }

    return(
        <div className="flex items-start justify-center flex-wrap gap-x-5 gap-y-7 p-5">
            {data.map(item => (
                <ClassCard 
                    key={item.id}
                    label={item.title}
                    numOfStudents={item.student_count}
                    theme={item.theme}
                />
            ))}
        </div>
    );
}