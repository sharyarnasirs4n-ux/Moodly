import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('DiaryApp.db');

export const migrateDB=()=>{
    
    try{
        db.execSync("ALTER TABLE entries ADD COLUMN timeSorted INTEGER")

        
    }catch(e){
        console.log("timeSorted already exists")

    }
    try{
                db.execSync("ALTER TABLE entries ADD COLUMN stickers text ")


    }catch(e){
        console.log("sticker allready exixt")
    }
    

}


export const initDB = () => {
  db.execSync(
      `CREATE TABLE IF NOT EXISTS entries (
        id TEXT PRIMARY KEY NOT NULL,
        mood TEXT,
        moodColor TEXT,
        moodImage TEXT,
        title TEXT,
        text TEXT,
        date TEXT,
        time TEXT,
        timeSorted INTEGER ,
        stickers text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      );`
      
    );
    migrateDB()
  };


export const insertEntry=(e)=>{
    db.runSync(
        `INSERT INTO entries(id,mood,moodColor,moodImage,title,text,date,time,timeSorted,stickers)
        VALUES (?,?,?,?,?,?,?,?,?,?)`,[
            e.id,
            e.mood,
            e.moodColor,
            e.moodImage,
            e.title,
            e.text,
            e.date,
            e.time,
            e.timeSorted,
            JSON.stringify(e.stickers||[])

        ]
    )
}

export const getEntries = () => {
  const data = db.getAllSync(
    `SELECT * FROM entries ORDER BY date DESC, time DESC`
  );

  return data.map((item) => ({
    ...item,
    stickers: item.stickers ? JSON.parse(item.stickers) : []
  }));
};
   
export const deleteEntriesAll=()=>{
    db.execSync("DELETE FROM entries");
    console.log("everything deleted")

}
export const deleteSingleEntry=(id)=>{
    
    db.execSync(`delete from entries where id=${id}`);
    console.log(`Entry ID ${id} deleted`)
}

export const entryUpdate=(e)=>{
    db.execSync(`update entries
        set
        title="${e.title}",

        text="${e.text}",
        mood="${e.mood}",
        moodColor="${e.moodColor}",
        moodImage="${e.moodImage}",
        date="${e.date}",
        time="${e.time}",
        timeSorted="${e.timeSorted}",
        stickers='${JSON.stringify(e.stickers||[])}'
        where id="${e.id}"
        `)
}