import Database from "@tauri-apps/plugin-sql";

export default async function updateStudent(name, regNum, notes, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE student SET name = $1, reg_num = $2, notes = $3 WHERE id = $4",
        [name, regNum, notes, id],
    );

}