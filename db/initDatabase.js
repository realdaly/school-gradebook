"use client";
import Database from "@tauri-apps/plugin-sql";

export default async function initDatabase(){
    const db = await Database.load("sqlite:grades.db");

    // Config Table
    await db.execute(`
        CREATE TABLE IF NOT EXISTS "config" (
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
            "title" VARCHAR(1000) DEFAULT NULL,
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
                (COALESCE(first_term_mark, 0) + COALESCE(midterm_mark, 0) + COALESCE(second_term_mark, 0)) / 3
            ) VIRTUAL,
            "final_exam_mark" REAL DEFAULT NULL,
            "final_mark" REAL GENERATED ALWAYS AS (
                (COALESCE(average_mark, 0) + COALESCE(final_exam_mark, 0)) / 2
            ) VIRTUAL,
            "second_try_mark" REAL DEFAULT NULL,
            "final_mark_after_second_try" REAL GENERATED ALWAYS AS (
                (COALESCE(average_mark, 0) + COALESCE(second_try_mark, 0)) / 2
            ) VIRTUAL,
            FOREIGN KEY ("class_id") REFERENCES "class" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("subject_id") REFERENCES "subject" ("id") ON DELETE CASCADE,
            FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE
        );
    `);

    return null;
}
