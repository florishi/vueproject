DROP DATABASE IF EXISTS sanaya;
CREATE DATABASE sanaya;

USE sanaya;

create table Users(
	id integer not null unique auto_increment,
    Email varchar(50),
    userName varchar(50)
);

create table Stresses(
	id integer not null unique auto_increment,
    usersID integer,
    moods varchar(10),
    hoursSleep integer,
    minsExercise integer,
    coffeeUnits integer,
    inputDate date    
);

create table health(
	id integer not null unique auto_increment,
    usersID integer,
    weight integer,
    waterUnits integer,
    alchoolUnits integer,
    steps integer,
    calories integer,
    inputDate date
);