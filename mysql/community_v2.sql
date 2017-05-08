

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS events;
CREATE TABLE `events` (
  `event_id` int NOT NULL primary key auto_increment,
  `event_name` varchar(100) DEFAULT NULL,
  `owner_email` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `date_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS messages;
CREATE TABLE `messages` (
  `sender_email` varchar(50) NOT NULL,
  `sendee_email` varchar(50) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `date_sent` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS rating;
CREATE TABLE `rating` (
  `rater_email` varchar(50) NOT NULL,
  `ratee_email` varchar(50) NOT NULL,
  `event_id` int NOT NULL,
  `rating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `rating` float NOT NULL,
  `public_profile` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `users` (`email`, `first_name`, `last_name`, `password`, `zipcode`, `rating`, `public_profile`) VALUES
('ctopher.vargas@gmail.com', 'Christopher', 'Vargas', '$2a$10$gPa.m2.daQbU0kG4vhSgRu3v8Zv8gZ9.7N/O8oHLuJ7P4wHzOy6Tu', '90805', 5, 0),
('user1@gmail.com', 'Alejandro', 'Morales', '$2a$10$XEs9/rZ2PrABIIChdpgRwegwKrdeMkHUCdrAoDtyme3E.s.t1UySO', '12345', 5, 0),
('user2@gmail.com', 'Alejandro', 'Morales', '$2a$10$clBYSTiCjNX3T39NlVT5oeB8dx22vi7nk9NpBKlzrxqWdnu5cIJTS', '12345', 5, 0),
('user3@gmail.com', 'Alejandro', 'Morales', '$2a$10$cdJBeE1sDYLkcA5SfC99Kud9yueD67MGA52KaOpGdUmmGdh4a7Jj6', '12345', 5, 0);


DROP TABLE IF EXISTS volunteers;
CREATE TABLE `volunteers` (
  `participant_email` varchar(50) NOT NULL,
  `event_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `events`
  ADD KEY `owner_email` (`owner_email`);

ALTER TABLE `messages`
  ADD PRIMARY KEY (`sender_email`,`sendee_email`,`date_sent`),
  ADD KEY `sender_email` (`sender_email`,`sendee_email`),
  ADD KEY `message_sendee_constraint` (`sendee_email`);


ALTER TABLE `rating`
  ADD PRIMARY KEY (`rater_email`,`ratee_email`,`event_id`),
  ADD KEY `rater_email` (`rater_email`,`ratee_email`,`event_id`),
  ADD KEY `rating_ratee_constraint` (`ratee_email`),
  ADD KEY `rating_event_constraint` (`event_id`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);


ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`event_id`,`participant_email`),
  ADD KEY `participant_email` (`participant_email`,`event_id`);


ALTER TABLE `events`
  ADD CONSTRAINT `event_email_constraint` FOREIGN KEY (`owner_email`) REFERENCES `users` (`email`);


ALTER TABLE `messages`
  ADD CONSTRAINT `message_sendee_constraint` FOREIGN KEY (`sendee_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `message_sender_constraint` FOREIGN KEY (`sender_email`) REFERENCES `users` (`email`);


ALTER TABLE `rating`
  ADD CONSTRAINT `rating_event_constraint` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `rating_ratee_constraint` FOREIGN KEY (`ratee_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `rating_rater_constraint` FOREIGN KEY (`rater_email`) REFERENCES `users` (`email`);


ALTER TABLE `volunteers`
  ADD CONSTRAINT `volunteers_email_constraint` FOREIGN KEY (`participant_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `volunteers_event_constraint` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);
