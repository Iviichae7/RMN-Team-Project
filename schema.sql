use schema; -- Make sure to change this line to your schema name

-- The messages table
create table Messages (
    Message_ID int auto_increment primary key,
    Ticket_ID int null,
    Message text null,
    Sender varchar(255) null,
    Created_At timestamp default current_timestamp
);

-- The remote support tickets table
create table RemoteSupportTickets (
    id int auto_increment primary key,
    user_id int not null,
    anydesk_id varchar(255) not null,
    description text null,
    status varchar(50) default 'pending',
    request_date timestamp default current_timestamp
);

-- The support requests table
create table SupportRequests (
    ID int auto_increment primary key,
    UserID int not null,
    IPAddress varchar(45) null,
    AnyDeskAddress varchar(100) not null,
    Reason varchar(255) null,
    Description text null,
    CreatedAt timestamp default current_timestamp,
    status varchar(255) default 'open'
);

-- The tickets table
create table Tickets (
    Ticket_ID int auto_increment primary key,
    Subject varchar(255) not null,
    Description text null,
    Category varchar(255) null,
    Status varchar(50) default 'open',
    User_ID int not null,
    Created_At timestamp default current_timestamp,
    Agent varchar(255) default 'notassigned',
    Priority enum('low', 'medium', 'high') default 'low',
    StatusID int default 0
);

-- The users table
create table Users (
    User_ID int auto_increment primary key,
    First_Name varchar(30) not null,
    Second_Name varchar(30) null,
    Email varchar(50) not null,
    Phone varchar(10) null,
    Address varchar(255) null,
    Plan varchar(15) null,
    Company_ID varchar(6) null,
    password varchar(255) null,
    role enum('user', 'admin') default 'user'
);
