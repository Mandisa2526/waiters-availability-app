CREATE TABLE waiter (
	id SERIAL NOT NULL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL
);

CREATE TABLE week_day (
	id SERIAL NOT NULL PRIMARY KEY,
	week_day TEXT UNIQUE NOT NULL
);

CREATE TABLE waiter_week_day (
	waiter_id INT,
    week_day_id INT,
	foreign key (waiter_id) references waiter(id) ON DELETE CASCADE,
    foreign key (week_day_id) references week_day(id) ON DELETE CASCADE,
);