"use client";
import Database from "@tauri-apps/plugin-sql";

export default async function initDatabase(){
    const db = await Database.load("sqlite:grades.db");

    // Config Table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS "config" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
            "title" VARCHAR(1000) DEFAULT NULL,
            "school" VARCHAR(1000) DEFAULT NULL,
            "year" VARCHAR(255) DEFAULT NULL,
            "principal" VARCHAR(255) DEFAULT NULL,
            "accentColor" VARCHAR(20) DEFAULT NULL
        );
    `);

    // Class Table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS "class" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "title" VARCHAR(255) NOT NULL,
            "theme" VARCHAR(20) DEFAULT NULL,
            "is_literary" VARCHAR(5) NOT NULL
        );
    `);

    // Subject Table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS "subject" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "title" VARCHAR(255) NOT NULL,
            "is_literary" VARCHAR(5) NOT NULL
        );
    `);

    // Term Table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS "term" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "title" VARCHAR(255) NOT NULL, 
            "mark_ref" VARCHAR(255) NOT NULL 
        );
    `);

    // Student Table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS "student" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "name" VARCHAR(255) NOT NULL,
            "reg_num" VARCHAR(20) DEFAULT NULL,
            "notes" TEXT DEFAULT NULL,
            "first_try_result" VARCHAR(512) DEFAULT NULL,
            "second_try_result" VARCHAR(512) DEFAULT NULL,
            "class_id" INTEGER NOT NULL,
            FOREIGN KEY ("class_id") REFERENCES "class" ("id") ON DELETE CASCADE
        );
    `);

    // Marks Table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS "marks" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "class_id" INTEGER NOT NULL,
            "subject_id" INTEGER NOT NULL,
            "student_id" INTEGER NOT NULL,
            "first_term_mark" REAL DEFAULT NULL,
            "midterm_mark" REAL DEFAULT NULL,
            "second_term_mark" REAL DEFAULT NULL,
            "average_mark" REAL GENERATED ALWAYS AS (
                CASE 
                    WHEN first_term_mark IS NOT NULL AND midterm_mark IS NOT NULL AND second_term_mark IS NOT NULL 
                    THEN (first_term_mark + midterm_mark + second_term_mark) / 3 
                    ELSE NULL
                END
            ) VIRTUAL,
            "final_exam_mark" REAL DEFAULT NULL,
            "final_mark" REAL GENERATED ALWAYS AS (
                CASE 
                    WHEN average_mark IS NOT NULL AND final_exam_mark IS NOT NULL 
                    THEN (average_mark + final_exam_mark) / 2 
                    ELSE NULL
                END
            ) VIRTUAL,
            "second_try_mark" REAL DEFAULT NULL,
            "final_mark_after_second_try" REAL GENERATED ALWAYS AS (
                CASE 
                    WHEN second_try_mark IS NOT NULL 
                    THEN (COALESCE(average_mark, 0) + second_try_mark) / 2 
                    ELSE NULL
                END
            ) VIRTUAL,
            FOREIGN KEY ("class_id") REFERENCES "class" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("subject_id") REFERENCES "subject" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE
        );
    `);

    return null;
}
