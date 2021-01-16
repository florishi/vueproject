const {connection,DataTypes} = require('./db');

const Users = connection.define('User', {
  id      :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  Email   :{type: DataTypes.STRING(50)},
  userName:{type: DataTypes.STRING(50)}
},{
  timestamps : false,
});

const Stress = connection.define('Stress', {
  id           :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  usersID      :{type: DataTypes.INTEGER },
  moods        :{type: DataTypes.STRING(10)},
  hoursSleep  :{type:DataTypes.INTEGER },
  minsExercise:{type:DataTypes.INTEGER},
  coffeeUnits :{type:DataTypes.INTEGER},
  inputDate   :{type:DataTypes.DATE}
},{
  timestamps : false,
});

const Health = connection.define('health', {
  id           :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  usersID      :{type: DataTypes.INTEGER },
  weight       :{type: DataTypes.STRING(10)},
  waterUnits   :{type:DataTypes.INTEGER },
  alchoolUnits :{type:DataTypes.INTEGER},
  steps        :{type:DataTypes.INTEGER},
  calories     :{type:DataTypes.INTEGER},
  inputDate    :{type:DataTypes.DATE}
},{
  timestamps : false,
});

const select = (table) =>{
  table.findAll().then((data) => {
    console.log(data);
  });
};

const createUsers =(email,name) => {
  Users.create({Email:email,userName:name});
};

const createStress = (id,mood,hoursSleept,minEx,coffee,date) => {
  Stress.create({usersID:id,moods:mood,hoursSleep:hoursSleept,minsExercise:minEx,coffeeUnits:coffee,inputDate:date})
}

const createHealth = (id,weightIn,water,alchool,stepsIn,caloriesIn,date) =>{
  Health.create({usersID:id,weight:weightIn,waterUnits:water,alchoolUnits:alchool,steps:stepsIn,calories:caloriesIn,inputDate:date})
}

module.exports = {
  select,
  createUsers,
  createStress,
  createHealth
};