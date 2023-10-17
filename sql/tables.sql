CREATE TABLE waiters (
	waiters_id serial not null primary key,
    username text unique not null,
);

create table weekDays (
	weekdays_id serial not null primary key,
	week_days int,
);

create table admin (
	waiters_id int,
    weekdays_id int,
	foreign key (waiters_id) references waiters(waiters_id) ON DELETE CASCADE,
    foreign key (weekdays_id) references weekDays(weekdays_id) ON DELETE CASCADE
);