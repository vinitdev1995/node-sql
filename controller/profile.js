/*
 * Controller for Add / Update / Delete of Profile table
 */
 // Single Profile View
 exports.view = function(req, res){
   let id = req.params.id;
   db.query("SELECT * FROM profile WHERE id = ?", [id], function(err, rows){
     if(err) console.log("Error Selecting list : %s", err);
     res.send(rows);
   });
 };

// Profile list Export
exports.list = function(req, res){
  db.query("SELECT * FROM profile", function(err, rows){
    if(err) console.log("Error Selecting list : %s", err);
    res.send(rows);
  });
};

// Profile Edit
exports.edit = function(req, res){
  let id = req.params.id;
  db.query("SELECT * FROM profile WHERE id = ?", [id], function(err, rows){
    if(err) console.log("Error Editing list : %s", err);
    res.send(rows);
  });
};

//Profile save
exports.save = function(req, res){
  let input = JSON.parse(JSON.stringify(req.body));
  let data = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    phone: input.phone,
    street_address: input.street_address,
    street_address_2: input.street_address_2,
    city: input.city,
    state: input.state,
    country: input.country
  };
  db.query("INSERT INTO profile set ?", data, function(err, rows, fields){
    if(err)
      console.log("Error in Inserting Data : %s", err);
    else{
      db.query("SELECT * FROM profile WHERE id = ?", rows.insertId, function(err, rows){
        if(err) console.log("Error Editing list : %s", err);
        res.send({ rows, fields });
      });
    }
  });
};

//Profile Save Edit
exports.save_edit = function(req, res){
  let input = JSON.parse(JSON.stringify(req.body));
  let id = req.params.id;
  let data = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    phone: input.phone,
    street_address: input.street_address,
    street_address_2: input.street_address_2,
    city: input.city,
    state: input.state,
    country: input.country
  };
  db.query("UPDATE profile set ? WHERE id = ?", [data, id], function(err, rows){
    if(err)
      console.log("Error in Updating : %s", err);
    else{
      db.query("INSERT INTO profile set ?", data, function(err, rows, fields){
        if(err)
          console.log("Error in Inserting Data : %s", err);
        else{
          db.query("SELECT * FROM profile WHERE id = ?", rows.insertId, function(err, rows){
            if(err) console.log("Error Editing list : %s", err);
            res.send({rows, fields});
          });
        }
      });
    }
  });
};

//Profile DELETE
exports.delete = function(req, res){
  let id = req.params.id;
  db.query("DELETE FROM profile WHERE id = ? ", [id], function(err, rows){
    if(err)
      console.log("Error in Deleting : %s", err);
    else{
      console.log("Profile Deleted: %s", rows);
      res.send(rows);
    }
  });
};
