-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "picture" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Course" ("category", "createdAt", "description", "id", "name", "picture", "teacher") SELECT "category", "createdAt", "description", "id", "name", "picture", "teacher" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
