const orm = require('../config/orm');

const select = (table,user) =>{
  console.log("table",table)
  if(table === 'Users'){
    orm[table].findAll({where:{id:user}, raw: true}).then((data) => {
    console.log(data);
    return data;
  });
  }else{
    orm[table].findAll({where:{usersID:user}, raw: true}).then((data) => {
      return data;
    });
  }
};

const createUsers =(userId,email,name) => {
  orm.Users.create({sessionId:userId,Email:email,userName:name});
};

const createStress = (id,mood,hoursSleept,minEx,coffee,date) => {
  orm.Stress.create({usersId:id,moods:mood,hoursSleep:hoursSleept,minsExercise:minEx,coffeeUnits:coffee,inputDate:date});
};

const createHealth = (id,water,alchool,stepsIn,caloriesIn,date) =>{
  orm.Health.create({usersId:id,waterUnits:water,alchoolUnits:alchool,steps:stepsIn,calories:caloriesIn,inputDate:date});
};

module.exports = {
  select,
  createUsers,
  createStress,
  createHealth
};
