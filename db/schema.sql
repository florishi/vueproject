DROP DATABASE IF EXISTS sanaya;
CREATE DATABASE sanaya;

USE sanaya;

create table Users(
	id varchar(22)  not null unique primary key,
    Email varchar(50),
    userName varchar(50)
);

create table Stresses(
	id integer not null unique auto_increment,
    usersID varchar(22),
    moods varchar(10),
    hoursSleep integer,
    minsExercise integer,
    coffeeUnits integer,
    inputDate date    
);

create table health(
	id integer not null unique auto_increment,
    usersID varchar(22),
	waterUnits integer,
    alchoolUnits integer,
    steps integer,
    calories integer,
    inputDate date
);