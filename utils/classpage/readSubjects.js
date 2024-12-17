import Database from "@tauri-apps/plugin-sql";

export default async function readSubjects(setData, setFirstSubjectId){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
    const subjects = await db.select("SELECT * FROM subject");

    if(setData){
        setData(subjects);
    }
    if(setFirstSubjectId){
        setFirstSubjectId(subjects[0]?.id);
    }
}