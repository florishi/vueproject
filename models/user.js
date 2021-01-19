const orm = require('../config/orm');

const select = (table,user) =>{
  orm.table.findAll({where:{id:user}}).then((data) => {
    console.log(data);
  });
};

const createUsers =(email,name) => {
  orm.Users.create({Email:email,userName:name});
};

const createStress = (id,mood,hoursSleept,minEx,coffee,date) => {
  orm.Stress.create({usersID:id,moods:mood,hoursSleep:hoursSleept,minsExercise:minEx,coffeeUnits:coffee,inputDate:date});
};

const createHealth = (id,weightIn,water,alchool,stepsIn,caloriesIn,date) =>{
  orm.Health.create({usersID:id,weight:weightIn,waterUnits:water,alchoolUnits:alchool,steps:stepsIn,calories:caloriesIn,inputDate:date});
};

module.exports = {
  select,
  createUsers,
  createStress,
  createHealth
};