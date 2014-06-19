var express    = require('express'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    mysql      = require('mysql'),
    app        = express(),
    port       = process.env.VCAP_APP_PORT || 9090;

// support urlencoded and json bodies
app.use(bodyParser());

// default database config
var db_config = {
  host            : 'localhost',
  port            : 3306,
  user            : 'root',
  password        : '',
  database        : 'test'
};

// read database config form VCAP_SERVICES env
if (process.env.VCAP_SERVICES) {
  var mysql_config = JSON.parse(process.env.VCAP_SERVICES).mysql[0].credentials;
  db_config.host = mysql_config.hostname;
  db_config.port = mysql_config.port;
  db_config.user = mysql_config.username;
  db_config.password = mysql_config.password;
  db_config.database = mysql_config.name;
}

console.log('----->', 'db_config: ', db_config);

// create connection pool
var pool = mysql.createPool({
  connectionLimit : 10,
  connectTimeout  : 10000, // 10s
  host            : db_config.host,
  port            : db_config.port,
  user            : db_config.user,
  password        : db_config.password,
  database        : db_config.database
});

pool.getConnection(function(err, connection){
  if (err) throw err;

  // create table if it does'nt exist
  connection.query("show tables like 'hiscores'", function(err, rows) {
    if (err) throw err;

    if (rows.length == 0) {
      connection.query("CREATE TABLE `hiscores` (" +
        "`id` int(11) NOT NULL AUTO_INCREMENT," +
        "`name` varchar(255) NOT NULL," +
        "`score` int(11) NOT NULL," +
        "PRIMARY KEY (`id`))"
      );
      connection.query("CREATE UNIQUE INDEX `name` ON `hiscores` (`name`)");
    }
  });

  connection.release();
});

// serve static files
app.use('/',express.static(path.join(__dirname, 'public')));

// create hiscore
app.post('/hiscores', function(req, res){
  var name  = req.body.name,
      score = parseInt(req.body.score);

  if (!name || name == '' || !score || score < 0) {
    res.status(400).write('name or score not given');
    return res.end();
  }

  pool.query(
    "INSERT INTO `hiscores` (`name`, `score`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `score`= IF(score > ?, score, ?)",
    [name, score, score, score],
    function(err, result) {
      if (err) throw err;

      res.status(201).end();
    }
  );
});

// hiscore list
app.get('/hiscores', function(req, res){
  pool.query("SELECT * FROM `hiscores` ORDER BY `score` DESC LIMIT 10", function(err, rows, fields){
    if (err) throw err;

    res.send(rows).end();
  });
});

var server = app.listen(port, function(req, res){
  console.log('Listening on port %d', server.address().port);
});
