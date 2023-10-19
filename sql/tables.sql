CREATE TABLE waiters (
	waiters_id SERIAL NOT NULL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL
);

CREATE TABLE weekDays (
	weekdays_id SERIAL NOT NULL PRIMARY KEY,
	week_days TEXT UNIQUE NOT NULL
);

CREATE TABLE admin (
	waiters_id INT,
    weekdays_id INT,
	foreign key (waiters_id) references waiters(waiters_id) ON DELETE CASCADE,
    foreign key (weekdays_id) references weekDays(weekdays_id) ON DELETE CASCADE
);