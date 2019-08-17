//COMPONENT TO SIGNUP
exports.signup = function(req, res) {
  message = "";
  errno = 0;
  if (req.method == "POST") {
    var post = req.body;
    var fname = post.firstname;
    var sname = post.secondname;
    var email = post.email;
    var password = post.password;

    var sql =
      "INSERT INTO `users`(`first_name`,`last_name`,`email`,`password`) VALUES('" +
      fname +
      "','" +
      sname +
      "','" +
      email +
      "','" +
      password +
      "')";
    var query = db.query(sql, function(err, result) {
      if (err) {
        if (err.errno == 1062) {
          message = "Username/Email already exists.";
          errno = 400;
        } else {
          message = "Account not created.";
          errno = 400;
        }
        //console.log(err.errno);
      } else {
        message = "Succesfully! Your account has been created.";
        errno = 200;
      }
      res.render("signup", { message, errno });
    });
  } else {
    errno = 0;
    res.render("signup", { message, errno });
  }
};

//COMPONENT TO LOGIN
exports.login = (req, res) => {
  message = "";
  errno = 0;
  var sess = req.session;
  if (req.method == "POST") {
    var post = req.body;
    var email = post.email;
    var password = post.password;
    var sql =
      "SELECT id,first_name,last_name FROM users WHERE email=? AND password=?";
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        message = "Problem with database";
        //console.log(err);
      } else {
        if (results.length) {
          message = "successful login";
          req.session.userId = results[0].id;
          req.session.user = results[0];
          //console.log(results[0].id);
          res.redirect("/dashboard");

          //console.log(message);
        } else {
          message = "Wrong credentials";
          errno = 400;
          //console.log(message);
          res.render("index", { message, errno });
          //console.log(message);
        }
      }
    });
  } else {
    //console.log("Else");
    res.render("index.ejs", { message });
  }
};

//COMPONENT OF DASHBOARD PAGE
exports.dashboard = (req, res) => {
  var user = req.session.user,
    userId = req.session.userId;
  //console.log("ddd=" + userId);
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * from users WHERE id=?";
  db.query(sql, [userId], (err, results) => {
    res.render("dashboard.ejs", { user });
  });
};

//COMPONENT OF PROFILE PAGE
exports.profile = (req, res) => {
  var user = req.session.user,
    userId = req.session.userId;
  //console.log("ddd=" + userId);
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  var sql = "SELECT * from users WHERE id=?";
  db.query(sql, [userId], (err, results) => {
    res.render("profile.ejs", { data: results });
  });
};

//COMPONENT OF LOGOUT PAGE
exports.logout = (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/login");
  });
};
