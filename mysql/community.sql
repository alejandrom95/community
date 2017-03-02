-- phpMyAdmin SQL Dump
-- version 4.4.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 14, 2017 at 10:08 PM
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
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `email` varchar(50) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `rating` float NOT NULL,
  `public_profile` tinyint(1) NOT NULL,
  PRIMARY KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
/*ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);*/

--
--Table structure for events 
--

CREATE TABLE events(
  event_id varchar(10) NOT NULL,
  event_name varchar(100),
  owner_email varchar(50) NOT NULL,
  description varchar(1000) NOT NULL,
  status int NOT NULL,
  location varchar(50) NOT NULL,
  zipcode varchar(10) NOT NULL,
  date_time datetime NOT NULL,
  PRIMARY KEY (event_id),
  FOREIGN KEY (owner_email) REFERENCES users(email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--Table structure for volunteers
--

CREATE TABLE IF NOT EXISTS `volunteers` (
  `participant_email` varchar(50) NOT NULL,
  `event_id` varchar(30) NOT NULL,
  PRIMARY KEY (participant_email, event_id),
  FOREIGN KEY (participant_email) REFERENCES users(email),
  FOREIGN KEY (event_id) REFERENCES events(event_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--Table structure for rating 
--

CREATE TABLE IF NOT EXISTS `rating` (
  `rater_email` varchar(50) NOT NULL,
  `ratee_email` varchar(50) NOT NULL,
  `event_id` varchar(10) NOT NULL, 
  `rating` double NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (rater_email, ratee_email, event_id),
  FOREIGN KEY (rater_email) REFERENCES users(email),
  FOREIGN KEY (ratee_email) REFERENCES users(email),
  FOREIGN KEY (event_id) REFERENCES events(event_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--Table structure for messsages
--

CREATE TABLE IF NOT EXISTS `messages` (
	--email(?)
  `sender_email` varchar(50) NOT NULL,
  `sendee_email` varchar(50) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `date_sent` datetime NOT NULL,
  `read` boolean NOT NULL,
  PRIMARY KEY (sender_email, sendee_email, date_sent),
  FOREIGN KEY (sender_email) REFERENCES users(email),
  FOREIGN KEY (sendee_email) REFERENCES users(email),
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
