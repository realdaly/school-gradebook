import Database from "@tauri-apps/plugin-sql";

export default async function readClasses(setData){
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
    if(setData){
        setData(classes);
    }
}