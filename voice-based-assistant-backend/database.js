let sqlite3 = require('sqlite3').verbose()
let md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email_address TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL 
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email_address, password) VALUES (?,?,?)'
                db.run(insert, ["Testname1",
                                "testuser1@fake_email.com",
                                md5("123456")
                                ])

                db.run(insert, ["Testname2",
                                "testuser2@fake_email.com",
                                md5("123456")
                                ])
            }
        });  
    }
});


module.exports = db