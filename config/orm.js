const {connection,DataTypes} = require('./db')

const Users = connection.define('Users', {
    id      :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    Email   :{type: DataTypes.STRING(50) },
  },  {
    timestamps : false,
  } );
  
const Stress = connection.define('Stress', {
    id           :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    usersID      :{type: DataTypes.INTEGER },
    moods        :{type: DataTypes.STRING(10)},
    hours_sleep  :{type:DataTypes.INTEGER },
    mins_exercise:{type:DataTypes.INTEGER},
    coffee_units :{type:DataTypes.INTEGER},
    input_date   :{type:DataTypes.DATE}

  },  {
    timestamps : false,
  } );

  const Health = connection.define('Stress', {
    id           :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    usersID      :{type: DataTypes.INTEGER },
    weight       :{type: DataTypes.STRING(10)},
    water_units  :{type:DataTypes.INTEGER },
    alchool_units:{type:DataTypes.INTEGER},
    steps        :{type:DataTypes.INTEGER},
    calories     :{type:DataTypes.INTEGER},
    input_date   :{type:DataTypes.DATE}

  },  {
    timestamps : false,
  } );

  connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    
  }).then(() => {
    return Users.findAll()
  }).catch((e) =>{
    console.log(e);
  });

/* const selectAll = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM burgers;`, (error, data) => {
      if (error) {
        console.log("Error while reading from DB:", error);
        reject(error);
      } else {
        resolve(data);
      }
    })
  })
};


const insert = (toInsert) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO burgers (burger_name, devoured) VALUES ("${toInsert.burger_name}", ${toInsert.devoured});`, (error, data) => {
      if (error) {
        console.log("Error while saving to DB:", error);
        reject(error);
      } else {
        resolve(data);
      }
    })
  })
};

const update = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE burgers SET devoured = 1 WHERE id = ${data};`, (error, data) => {
      if (error) {
        console.log("Error while updating DB:", error);
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
};

const deleted = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM burgers WHERE id = ${data};`, (error, data) => {
      if (error) {
        console.log("Error while updating DB:", error);
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
};

module.exports = {
  selectAll,
  insert,
  update,
  deleted
} */