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
  `public_profile` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `first_name`, `last_name`, `password`, `zipcode`, `rating`, `public_profile`) VALUES
('user1@gmail.com', 'Alejandro', 'Morales', '$2a$10$XEs9/rZ2PrABIIChdpgRwegwKrdeMkHUCdrAoDtyme3E.s.t1UySO', '12345', 5, 0),
('user2@gmail.com', 'Alejandro', 'Morales', '$2a$10$clBYSTiCjNX3T39NlVT5oeB8dx22vi7nk9NpBKlzrxqWdnu5cIJTS', '12345', 5, 0),
('user3@gmail.com', 'Alejandro', 'Morales', '$2a$10$cdJBeE1sDYLkcA5SfC99Kud9yueD67MGA52KaOpGdUmmGdh4a7Jj6', '12345', 5, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
