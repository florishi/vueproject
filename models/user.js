const orm = require('../config/orm');

const select = (table,user) =>{
  if(table === 'Users'){
    orm.table.findAll({where:{id:user}}).then((data) => {
      console.log(data);
    });
  }else{
    orm.table.findAll({where:{usersID:user}}).then((data) => {
      console.log(data);
    });
  }
};


const createUsers =(userId,email,name) => {
  orm.Users.create({id:userId,Email:email,userName:name});
};

const createStress = (id,mood,hoursSleept,minEx,coffee,date) => {
  orm.Stress.create({usersID:id,moods:mood,hoursSleep:hoursSleept,minsExercise:minEx,coffeeUnits:coffee,inputDate:date});
};

const createHealth = (id,water,alchool,stepsIn,caloriesIn,date) =>{
  orm.Health.create({usersID:id,waterUnits:water,alchoolUnits:alchool,steps:stepsIn,calories:caloriesIn,inputDate:date});
};

module.exports = {
  select,
  createUsers,
  createStress,
  createHealth
};