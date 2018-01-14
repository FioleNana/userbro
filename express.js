const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();

const fs = require('fs');
const app = express();
const port = 1337;

let db = new sqlite3.Database('./express/users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the user database.');
  console.log('Creating table (if it does not exist...)');
});

db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS users (" +
    "id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE," +
    "pic TEXT, " +
    "name TEXT," +
    "supername TEXT," +
    "affiliates TEXT" +
    ")");
  insertTestData();
});

function insertTestData() {
  let sql = 'SELECT COUNT(*) as count FROM users';
  db.get(sql, [], (err, row) => {
    if (row.count <= 0) {
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        1,
        'http://localhost:1337/avatars/1_avatar.jpg',
        'Bruce Wayne',
        'The Batman',
        'Justice League');
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        2,
        'http://localhost:1337/avatars/2_avatar.jpg',
        'Clark Kent',
        'Superman',
        'Justice League');
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        3,
        'http://localhost:1337/avatars/3_avatar.jpg',
        'John Logan',
        'The Wolverine',
        'X-Men');
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        4,
        'http://localhost:1337/avatars/4_avatar.jpg',
        'Miles Morales',
        'Spiderman',
        'The Avengers');
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        5,
        'http://localhost:1337/avatars/5_avatar.jpg',
        'Matt Murdock',
        'Daredevil',
        'Defenders');
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        6,
        'http://localhost:1337/avatars/6_avatar.jpg',
        'Wade Wilson',
        'Deadpool',
        'Mercs for Money');
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        7,
        'http://localhost:1337/avatars/7_avatar.jpg',
        'Walter Kovacs',
        'Rorschach',
        'Crimebusters');
      db.run("INSERT INTO users (id, pic, name, supername, affiliates) VALUES (?, ?, ?, ?, ?)",
        8,
        'http://localhost:1337/avatars/8_avatar.jpg',
        'Hal Jordan',
        'Green Lantern',
        'Green Lantern Corps');
    }
  });
}

app.listen(port, (err) => {
  if (err) {
    return console.log('Oh no! Something bad happened =/', err);
  }
  console.log('User-Bro backend is listening on ' + port);
  console.log('  _    _                      ____            \n' +
    ' | |  | |                    |  _ \\           \n' +
    ' | |  | |___  ___ _ __ ______| |_) |_ __ ___  \n' +
    ' | |  | / __|/ _ \\ \'__|______|  _ <| \'__/ _ \\ \n' +
    ' | |__| \\__ \\  __/ |         | |_) | | | (_) |\n' +
    '  \\____/|___/\\___|_|         |____/|_|  \\___/ \n' +
    '                                              ');
  console.log('by Fiole')
});

app.use(express.static('express'));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./express/avatars");
  },
  filename: function (req, file, callback) {
    let newId;
    if (req.body.id) {
      newId = req.body.id;
      const fileEnd = file.originalname.substring(file.originalname.lastIndexOf('.'));
      callback(null, newId + '_avatar' + fileEnd);
    } else {
      db.get('select seq as lastId from sqlite_sequence where name=\'users\'', [], (error, row) => {
        newId = row.lastId + 1;
        const fileEnd = file.originalname.substring(file.originalname.lastIndexOf('.'));
        callback(null, newId + '_avatar' + fileEnd);
      });
    }
  }
});

const upload = multer({storage: Storage});

app.get('/ub/users', (request, response) => {
  let sql = 'SELECT * FROM users';
  db.all(sql, [], (error, rows) => {
    response.send(rows);
  });
});

app.post('/ub/users', upload.single('avatar'), (request, response) => {
  let imageUrl = '';
  if (request.file) {
    imageUrl = request.protocol + '://' + request.get('host') + '/avatars/' + request.file.filename;
  }
  let user = request.body;
  let insertSQL = 'INSERT INTO users (pic, name, supername, affiliates) VALUES (?, ?, ?, ?)';

  db.run(insertSQL, imageUrl, user.name, user.supername, user.affiliates, function (error)  {
    if (error) {
      console.log(error);
    }
    let getSQL = 'SELECT * FROM users WHERE id=' + this.lastID;
    db.get(getSQL, [], (error, row) => {
      response.send(row);
    });
  });
});

app.put('/ub/users/:id', upload.single('avatar'), (request, response) => {
  let imageUrl = '';
  if (request.file) {
    imageUrl = request.protocol + '://' + request.get('host') + '/avatars/' + request.file.filename;
  }
  let id = request.params.id;
  let updatedUser = request.body;

  let updateSQL = 'UPDATE users SET ';
  if (request.file) {
    updateSQL += 'pic=\'' + imageUrl + '\',';
  }
  if (updatedUser.name) {
    updateSQL += 'name=\'' + updatedUser.name + '\'';
  }
  if (updatedUser.supername) {
    updateSQL += ',supername=\'' + updatedUser.supername + '\'';
  }
  if (updatedUser.affiliates) {
    updateSQL += ',affiliates=\'' + updatedUser.affiliates + '\' ';
  }

  updateSQL += 'WHERE id=' + id;

  db.run(updateSQL, [], (error) => {
    if (error) {
      console.log(error);
    }

    let getSQL = 'SELECT * FROM users WHERE id=' + id;
    db.get(getSQL, [], (error, row) => {
      response.send(row);
    });
  });
});

app.get('/ub/users/:id', (request, response) => {
  let id = request.params.id;
  let userToGet;
  for (let user of users) {
    if (user.id === parseInt(id)) {
      userToGet = user;
      break;
    }
  }

  response.send(userToGet);
});

app.delete('/ub/users/:id', (request, response) => {
  let id = request.params.id;
  let deleteSQL = 'DELETE FROM users WHERE id=' + id;

  db.run(deleteSQL, [], (error) => {
    if (error) {
      console.log(error);
    }

    fs.unlink('express/avatars/' + id + "_avatar.jpg", (err) => {
    });
    fs.unlink('express/avatars/' + id + "_avatar.jpeg", (err) => {
    });
    fs.unlink('express/avatars/' + id + "_avatar.png", (err) => {
    });

    response.send();
  });
});
