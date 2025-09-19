create table factories(
	id serial primary key,
	factory_title varchar (255),
	annual_income numeric (15, 2),
	employees_qty integer,
	foundation_date date,
	"createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
)

create table cars(
	id serial primary key,
	car_brand varchar(255),
	price numeric(10, 2),
	doors_qty integer,
	manufacturer_date date,
	factory_id integer,
	"createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
	foreign key (factory_id) references Factories(id)
)


INSERT INTO factories (id, factory_title, annual_income, employees_qty, foundation_date) VALUES
(1, 'Toyota Plant', 35214567.45, 12000, '1975-06-12'),
(2, 'BMW Werk', 18954321.12, 8000, '1962-04-23'),
(3, 'Audi Fabrik', 27654890.55, 9500, '1980-09-15'),
(4, 'Mercedes Werk', 41236789.99, 15000, '1955-11-02'),
(5, 'Ford Plant', 14325678.32, 10000, '1970-07-07'),
(6, 'Volkswagen Wolfsburg', 50000000.00, 20000, '1950-05-18'),
(7, 'Hyundai Factory', 23456789.77, 14000, '1985-02-10'),
(8, 'Kia Motors Plant', 19876543.88, 11000, '1992-10-25'),
(9, 'Honda Plant', 28765432.65, 9000, '1968-03-30'),
(10, 'Nissan Factory', 16789012.22, 7000, '1978-12-12'),
(11, 'Mazda Factory', 12345678.90, 6000, '1972-04-18'),
(12, 'Subaru Plant', 14567890.12, 5000, '1982-08-22'),
(13, 'Lexus Plant', 25678901.33, 7500, '1989-11-11'),
(14, 'Chevrolet Factory', 19876543.21, 9000, '1965-03-15'),
(15, 'Chrysler Plant', 17865432.45, 8500, '1976-06-30'),
(16, 'Fiat Factory', 13456789.67, 7000, '1958-12-01'),
(17, 'Peugeot Plant', 12345678.12, 6500, '1969-09-05'),
(18, 'Renault Factory', 14567890.45, 7200, '1973-01-20'),
(19, 'Jaguar Plant', 19876543.66, 4800, '1980-07-13'),
(20, 'Land Rover Factory', 21234567.88, 5100, '1975-10-10');

INSERT INTO cars (id, car_brand, price, doors_qty, manufacturer_date, factory_id) VALUES
(1, 'Toyota', 28821.94, 5, '2019-05-26', 1),
(2, 'BMW', 62803.64, 2, '2016-12-01', 2),
(3, 'Audi', 42004.20, 4, '2021-07-09', 3),
(4, 'Mercedes', 48899.29, 3, '2019-08-16', 4),
(5, 'Ford', 15977.86, 5, '2023-02-11', 5),
(6, 'Volkswagen', 35332.44, 5, '2020-03-17', 6),
(7, 'Hyundai', 21245.55, 4, '2018-09-05', 7),
(8, 'Kia', 19876.22, 4, '2017-11-20', 8),
(9, 'Honda', 25678.43, 5, '2022-01-14', 9),
(10, 'Nissan', 27890.12, 5, '2015-07-22', 10),
(11, 'Mazda', 18234.55, 4, '2019-03-18', 11),
(12, 'Subaru', 24567.88, 5, '2018-06-25', 12),
(13, 'Lexus', 52345.66, 4, '2020-10-10', 13),
(14, 'Chevrolet', 19876.44, 4, '2017-01-05', 14),
(15, 'Chrysler', 27890.22, 4, '2019-12-12', 15),
(16, 'Fiat', 15432.11, 3, '2021-08-18', 16),
(17, 'Peugeot', 16789.33, 4, '2016-05-30', 17),
(18, 'Renault', 19876.55, 5, '2018-11-11', 18),
(19, 'Jaguar', 52345.77, 2, '2020-09-09', 19),
(20, 'Land Rover', 48999.88, 4, '2019-07-07', 20);


SELECT setval('factories_id_seq', (SELECT MAX(id) FROM factories), true);
SELECT setval('cars_id_seq', (SELECT MAX(id) FROM cars), true);