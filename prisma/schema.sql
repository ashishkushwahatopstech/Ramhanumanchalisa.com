-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "coverImage" TEXT,
    "imageAlt" TEXT,
    "imageTitle" TEXT,
    "imageCaption" TEXT,
    "focusKeywords" TEXT,
    "internalLinks" TEXT,
    "sources" TEXT,
    "faqs" TEXT,
    "galleryImages" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "situation" TEXT NOT NULL,
    "icon" TEXT DEFAULT '­ƒÖÅ',
    "description" TEXT NOT NULL,
    "recommendedChants" TEXT,
    "targetVerseNumber" INTEGER,
    "targetVerseText" TEXT,
    "targetVerseTranslation" TEXT,
    "detailedExposition" TEXT NOT NULL,
    "actionSteps" TEXT,
    "coverImage" TEXT,
    "imageAlt" TEXT,
    "imageTitle" TEXT,
    "imageCaption" TEXT,
    "galleryImages" TEXT,
    "focusKeywords" TEXT,
    "internalLinks" TEXT,
    "sources" TEXT,
    "faqs" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageSlug" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AudioTrack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reciterName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "timestampsJSON" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "JayantiConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "pujaMuhurat" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RecitationCounter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "LanguageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "contentJSON" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Benefit_slug_key" ON "Benefit"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "JayantiConfig_year_key" ON "JayantiConfig"("year");

-- CreateIndex
CREATE UNIQUE INDEX "RecitationCounter_date_key" ON "RecitationCounter"("date");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageContent_lang_key" ON "LanguageContent"("lang");

-- CreateTable
CREATE TABLE "MediaImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "dataBase64" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaImage_path_key" ON "MediaImage"("path");

