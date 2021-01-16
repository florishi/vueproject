const {connection,DataTypes} = require('./db')


const Users = connection.define('User', {
    id      :{type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    Email   :{type: DataTypes.STRING(50)},
    userName:{type: DataTypes.STRING(50)}
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

  const Health = connection.define('health', {
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

/* Users.destroy({where : {id :2}}).then(()=>{
  return Users.findAll()
}).then((data) =>{
  console.log(data)
}) */
/* Users.create({Email:'renato@gmail.com',userName:"renato"})
.then(() =>{
  return Users.findAll()
})
.then((data)=>{console.log(data)}) */

module.exports = {
  Users,
  Stress,
  Health
}  