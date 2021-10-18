// Create express app
let express = require("express")
let db = require("./database.js")
let md5 = require("md5")
let auth = require("./authentication.js")
let cors = require("cors")

let app = express()

app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// Server port
let HTTP_PORT = 8000 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({message:"Ok"})
});

// Other endpoints

// GET

// get user by email
app.get("/api/user/:email_address", (req, res) => {
    let sql = "SELECT * FROM user WHERE email_address = ?"
    let params = [req.params.email_address]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({error:err.message});
          return;
        }
        res.json({
            message:"success",
            data:row
        })
      });
});

// get all users
app.get("/api/users", (req, res) => {
    let sql = "SELECT * FROM user"
    let params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({error:err.message});
          return;
        }
        res.json({
            message:"success",
            data:rows
        })
      });
});

// POST

// create a user
app.post("/api/user/", (req, res) => {
    let errors=[]
    if (!req.body.name){
        errors.push("No first name specified");
    }
    if (!req.body.email_address){
        errors.push("No email address specified");
    }
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (errors.length){
        res.status(400).json({error:errors.join(",")});
        return;
    }
    let data = {
        name: req.body.name,
        email_address: req.body.email_address,
        password: md5(req.body.password),
    }
    let sql ='INSERT INTO user (name, email_address, password) VALUES (?,?,?)'
    let params = [data.name, data.email_address, data.password]
    db.run(sql, params, function (err) {
        if (err){
            res.status(400).json({error: err.message})
            return;
        }
        res.json({
            message: "success",
            data: data,
            id : this.lastID
        })
    });
})

// log-in a user
app.post('/api/login/', (req, res) => {
    console.log(req.body)
    let errors=[]
    if (!req.body.email_address){
        errors.push("No email address specified");
    }
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (errors.length){
        res.status(400).json({error:errors.join(",")});
        return;
    }
    let data = {
        email_address: req.body.email_address,
        password: md5(req.body.password),
    }
    let sql = 'SELECT * FROM user WHERE email_address = ? AND password = ?'

    let params = [data.email_address, data.password]

    db.get(sql, params, function (err, row) {
        if (err){
            res.status(400).json({error: err.message})
            return;
        }
        if(row){
            let accessToken = auth.generateToken(row.email_address)
            res.json({
                message: "success",
                data: row,
                accessToken: accessToken
            })
        }
        else
        {
            res.status(404).json({error: "user not found, email or password are incorrect"})
            return;
        }
    });
});

// PATCH

// update a user
app.patch("/api/user/", auth.authenticateJWT, (req, res) => {
    var data = {
        name: req.body.name,
        current_email_address: req.body.current_email_address,
        new_email_address: req.body.new_email_address,
        password : req.body.password ? md5(req.body.password) : null
    }
    if(!(data.current_email_address === req.authenticated_user.email_address)){
        res.sendStatus(401)
        return
    }
    let sql = `UPDATE user set 
                name = COALESCE(?,name), 
                email_address = COALESCE(?,email_address), 
                password = COALESCE(?,password) 
                WHERE email_address = ?`
    let params = [data.name, data.new_email_address, data.password, data.current_email_address]
    db.run(sql, params, function (err) {
            if (err){
                res.status(400).json({error: res.message})
                return;
            }
            let accessToken = auth.generateToken(data.new_email_address)
            res.json({
                message: "success",
                data: data,
                changes: this.changes,
                accessToken: accessToken
            })
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});