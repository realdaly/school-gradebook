import Database from "@tauri-apps/plugin-sql";

export default async function readConfig(title, setTitle, accentColor, setAccentColor){
    const db = await Database.load("sqlite:grades.db");
    const response = await db.select("SELECT * from config LIMIT 1");
    
    if(response.length > 0){
        // set title and accentColor states to the database values if there was
        setTitle(response[0].title);
        setAccentColor(response[0].accentColor);
    } else {
        // create single config record in "config" table if there wasn't one already addded
        await db.execute(
            "INSERT into config (title, accentColor) VALUES ($1, $2)",
            [title, accentColor],
        );
        // set default app title
        setTitle("ســـجـــل الـــدرجـــــات الـــمـــدرســـــي");
    }
}