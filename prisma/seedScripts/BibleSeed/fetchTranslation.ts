import { prisma } from "../../../src/lib/prisma.js";
import axios from "axios";

async function fetchTranslation(code: string){
    const toLog = (process.env.NODE_ENV || "development") === "test" ? false : true;
    if(toLog) console.log("HI buddy")
    // const url = "https://raw.githubusercontent.com/scrollmapper/bible_databases/refs/heads/master/formats/json/AKJV.json"
    const url = "https://raw.githubusercontent.com/readytowin2298/bible_databases/refs/heads/main/translations/TRANSLATIONCODE.json";
    let data;
    try{
        data = await axios.get(url.replace("TRANSLATIONCODE", code));
    } catch(err){
        throw new Error(`That translation, ${code} doesn't seem to be available at https://raw.githubusercontent.com/readytowin2298/bible_databases/refs/heads/main/translations/`)
    }
    const {translation, books} = data.data;
    const name = translation.replace(`${code}: `, '')
    const newTranslation = await prisma.translation.create({
        data: {
            name, code
        }
    })
    for(let book of books){
        if(toLog) console.log(`Processing ${book.name}`)
        const newBook = await prisma.book.create({
            data: {
                name: book.name,
                translationCode: newTranslation.code,
                chapterCount: book.chapters.length
            }
        });
        for(let chapter of book.chapters){
            const newChapter = await prisma.chapter.create({
                data: {
                    number: chapter.chapter,
                    verseCount: chapter.verses.length,
                    translationCode: newTranslation.code,
                    bookId: newBook.id
                }
            });
            for(let verse of chapter.verses){
                const _newVerse = await prisma.verse.create({
                    data: {
                        number: verse.verse,
                        text: verse.text,
                        translationCode: newTranslation.code,
                        bookId: newBook.id,
                        chapterId: newChapter.id,
                        chapterNumber: newChapter.number
                    }
                })
            }
        }
    }
}

export default fetchTranslation;