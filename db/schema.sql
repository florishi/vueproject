DROP DATABASE IF EXISTS sanaya;
CREATE DATABASE sanaya;

USE sanaya;

create table Users(
	id integer not null unique auto_increment,
    Email varchar(50),
    userName varchar(50)
);

create table Stress(
	id integer not null unique auto_increment,
    usersID integer,
    moods varchar(10),
    hours_sleep integer,
    mins_exercise integer,
    coffee_units integer,
    input_date date    
);

create table health(
	id integer not null unique auto_increment,
    usersID integer,
    weight integer,
    water_units integer,
    alchool_units integer,
    steps integer,
    calories integer,
    input_date date
);