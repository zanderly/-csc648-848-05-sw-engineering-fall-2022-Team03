USE mytest;

DROP TABLE if exists Menu;
CREATE TABLE Menu (
    user CHAR(30) DEFAULT '' NOT NULL,
    password CHAR(30) DEFAULT '' NOT NULL,
    vendor_id INT UNSIGNED DEFAULT '0000' NOT NULL,
    PRIMARY KEY (user)
);

DROP TABLE if exists VendorAccount;
CREATE TABLE VendorAccount (
    invoice_date CHAR(30) DEFAULT '',
    id INT NOT NULL
);

DROP TABLE if exists Invoice;
CREATE TABLE Invoice (
	invoice_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    order_ID INT NOT NULL
);

DROP TABLE if exists CustomerAccount;
CREATE TABLE CustomerAccount(
	id	INT NOT NULL,
    first_name	VARCHAR(16)	NOT NULL,
    last_name	VARCHAR(16)	NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE if exists Purchase;
CREATE TABLE Purchase(
	order_id INT NOT NULL DEFAULT '0000',
    order_date DATETIME NOT NULL,
    cust_id	BIGINT NOT NULL DEFAULT '0000',
    status	VARCHAR(15) NOT NULL DEFAULT 'Unshipped'
    
);

DROP TABLE if exists Item;
CREATE TABLE Item (
	id	INT NOT NULL,
    quantity INT NOT NULL DEFAULT '0',
    price DECIMAL(10 , 2 ) NOT NULL DEFAULT '0.00',
    description VARCHAR(1000),
    nutrition_info VARCHAR(1000)
);

DROP TABLE if exists Info;
CREATE TABLE Info (
    email VARCHAR(319) NOT NULL UNIQUE,
    phone_num VARCHAR(15) NOT NULL UNIQUE,
    mail_addr VARCHAR(200) NOT NULL
);

DROP TABLE if exists Address;
CREATE TABLE Address (
	num INT NOT NULL,
    street VARCHAR(300) NOT NULL,
    city VARCHAR(300) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zipcode INT NOT NULL
);

INSERT INTO Item(id, quantity, price, description, nutrition_info)
Values(11111, 32, 52.22, 'Our very best apples EVER!!', '3 trillion calories'),
(13131, 12, 43.92, 'Our very worst oranges EVER!!', '2 million calories');