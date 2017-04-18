-- phpMyAdmin SQL Dump
-- version 4.4.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 18, 2017 at 08:51 PM
-- Server version: 5.6.24
-- PHP Version: 5.5.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `community`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `owner_email` varchar(50) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `location` varchar(50) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `date_time` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `owner_email`, `description`, `status`, `location`, `zipcode`, `date_time`) VALUES
(1, 'test event', 'user1@gmail.com', 'test description', 2, 'test location', '12345', '0000-00-00 00:00:00'),
(2, 'test event', 'user1@gmail.com', 'test description', 1, 'test location', '12345', '1000-01-01 00:00:00'),
(3, 't', 'user1@gmail.com', 't', 1, 'test location test', '12345', '1000-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `sender_email` varchar(50) NOT NULL,
  `sendee_email` varchar(50) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `date_sent` datetime NOT NULL,
  `read_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `date_time` datetime NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `rater_email` varchar(50) NOT NULL,
  `ratee_email` varchar(50) NOT NULL,
  `event_id` int(11) NOT NULL,
  `rating` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(50) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `rating` float NOT NULL,
  `public_profile` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `first_name`, `last_name`, `password`, `zipcode`, `rating`, `public_profile`) VALUES
('ctopher.vargas@gmail.com', 'Christopher', 'Vargas', '$2a$10$gPa.m2.daQbU0kG4vhSgRu3v8Zv8gZ9.7N/O8oHLuJ7P4wHzOy6Tu', '90805', 5, 0),
('user1@gmail.com', 'Alejandro', 'Morales', '$2a$10$XEs9/rZ2PrABIIChdpgRwegwKrdeMkHUCdrAoDtyme3E.s.t1UySO', '12345', 5, 0),
('user2@gmail.com', 'Alejandro', 'Morales', '$2a$10$clBYSTiCjNX3T39NlVT5oeB8dx22vi7nk9NpBKlzrxqWdnu5cIJTS', '12345', 5, 0),
('user3@gmail.com', 'Alejandro', 'Morales', '$2a$10$cdJBeE1sDYLkcA5SfC99Kud9yueD67MGA52KaOpGdUmmGdh4a7Jj6', '12345', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

DROP TABLE IF EXISTS `volunteers`;
CREATE TABLE IF NOT EXISTS `volunteers` (
  `participant_email` varchar(50) NOT NULL,
  `event_id` int(11) NOT NULL,
  `owner_email` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`participant_email`, `event_id`, `owner_email`, `status`) VALUES
('user2@gmail.com', 1, 'user1@gmail.com', 0),
('user1@gmail.com', 2, 'user1@gmail.com', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `owner_email` (`owner_email`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`sender_email`,`sendee_email`,`date_sent`),
  ADD KEY `sender_email` (`sender_email`,`sendee_email`),
  ADD KEY `message_sendee_constraint` (`sendee_email`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`rater_email`,`ratee_email`,`event_id`),
  ADD KEY `rater_email` (`rater_email`,`ratee_email`,`event_id`),
  ADD KEY `rating_ratee_constraint` (`ratee_email`),
  ADD KEY `rating_event_constraint` (`event_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`event_id`,`participant_email`),
  ADD KEY `participant_email` (`participant_email`,`event_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `event_email_constraint` FOREIGN KEY (`owner_email`) REFERENCES `users` (`email`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `message_sendee_constraint` FOREIGN KEY (`sendee_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `message_sender_constraint` FOREIGN KEY (`sender_email`) REFERENCES `users` (`email`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_event_constraint` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `rating_ratee_constraint` FOREIGN KEY (`ratee_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `rating_rater_constraint` FOREIGN KEY (`rater_email`) REFERENCES `users` (`email`);

--
-- Constraints for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD CONSTRAINT `volunteers_email_constraint` FOREIGN KEY (`participant_email`) REFERENCES `users` (`email`),
  ADD CONSTRAINT `volunteers_event_constraint` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
