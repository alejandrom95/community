-- phpMyAdmin SQL Dump
-- version 4.4.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 04, 2017 at 01:56 AM
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
(1, 'test event', 'user1@gmail.com', 'test description', 1, 'test location', '12345', '0000-00-00 00:00:00'),
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
  `read_status` tinyint(1) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`sender_email`, `sendee_email`, `message`, `date_sent`, `read_status`, `event_id`) VALUES
('user1@gmail.com', 'user1@gmail.com', 'aaa', '2017-03-27 17:33:20', 0, 0),
('user1@gmail.com', 'user1@gmail.com', 'test', '2017-03-27 17:41:35', 0, 0),
('user1@gmail.com', 'user1@gmail.com', 'abc', '2017-04-01 01:56:10', 0, 1),
('user1@gmail.com', 'user1@gmail.com', 'cba', '2017-04-01 01:59:03', 0, 1),
('user1@gmail.com', 'user1@gmail.com', 'aaa', '2017-04-01 17:13:18', 0, 1),
('user1@gmail.com', 'user1@gmail.com', 'aaaaa', '2017-04-02 02:00:23', 0, 1),
('user1@gmail.com', 'user1@gmail.com', 'test', '2017-04-03 16:46:12', 0, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `email`, `description`, `date_time`, `type`) VALUES
(1, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 12:46:56', 3),
(2, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 12:47:57', 3),
(3, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 12:48:21', 3),
(4, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 12:50:13', 3),
(5, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 12:53:25', 3),
(6, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 12:54:43', 3),
(7, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 12:56:59', 3),
(8, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-18 16:59:17', 3),
(9, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:20:30', 3),
(10, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:21:38', 3),
(11, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:24:29', 3),
(12, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:25:26', 3),
(13, 'user3@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:25:26', 3),
(14, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:28:03', 3),
(15, 'user3@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:28:03', 3),
(16, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:28:57', 3),
(17, 'user3@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:28:57', 3),
(18, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:29:25', 3),
(19, 'user3@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:29:25', 3),
(20, 'user2@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:30:18', 3),
(21, 'user3@gmail.com', 'The event undefined has been closed.', '2017-03-23 13:30:18', 3),
(22, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:30:56', 3),
(23, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:30:56', 3),
(24, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:11', 3),
(25, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:11', 3),
(26, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:14', 3),
(27, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:14', 3),
(28, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:34', 3),
(29, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:34', 3),
(30, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:36', 3),
(31, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:32:36', 3),
(32, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:23', 3),
(33, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:23', 3),
(34, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:24', 3),
(35, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:24', 3),
(36, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:25', 3),
(37, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:25', 3),
(38, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:48', 3),
(39, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:33:48', 3),
(40, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:34:42', 3),
(41, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:34:42', 3),
(42, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:35:02', 3),
(43, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:35:02', 3),
(44, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 13:35:29', 3),
(45, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 13:35:29', 3),
(46, 'user2@gmail.com', 'The event test event has been reopened.', '2017-03-23 15:29:32', 6),
(47, 'user3@gmail.com', 'The event test event has been reopened.', '2017-03-23 15:29:32', 6),
(48, 'user2@gmail.com', 'The event test event has been closed.', '2017-03-23 15:29:44', 4),
(49, 'user3@gmail.com', 'The event test event has been closed.', '2017-03-23 15:29:44', 4),
(50, 'user2@gmail.com', 'The event test event has been cancelled.', '2017-03-23 15:29:47', 5),
(51, 'user3@gmail.com', 'The event test event has been cancelled.', '2017-03-23 15:29:47', 5),
(52, 'user2@gmail.com', 'The event test event has been reopened.', '2017-03-23 15:30:05', 6),
(53, 'user3@gmail.com', 'The event test event has been reopened.', '2017-03-23 15:30:05', 6),
(55, 'user2@gmail.com', 'Volunteer request to test event has been denied.', '2017-03-23 15:36:37', 2),
(56, 'user2@gmail.com', 'Volunteer request to test event has been accepted.', '2017-03-23 15:36:38', 5),
(57, 'user3@gmail.com', 'Volunteer request to test event has been denied.', '2017-03-23 15:36:41', 2),
(58, 'user3@gmail.com', 'Volunteer request to test event has been accepted.', '2017-03-23 15:36:43', 5),
(59, 'user2@gmail.com', 'The volunteer Alejandro Morales has cancelled their volunteer request to test event.', '2017-03-23 15:53:32', 3),
(60, 'user2@gmail.com', 'The volunteer Alejandro Morales has cancelled their volunteer request to test event.', '2017-03-23 15:56:01', 3),
(66, 'user3@gmail.com', 'The event test event has been closed.', '2017-04-01 17:22:18', 4),
(68, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-01 17:22:54', 6),
(70, 'user3@gmail.com', 'The event test event has been cancelled.', '2017-04-01 17:29:05', 5),
(72, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-01 17:29:07', 6),
(74, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-01 17:34:08', 6),
(76, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-01 17:36:10', 6),
(78, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-01 18:36:29', 6),
(81, 'user3@gmail.com', 'The event test event has been cancelled.', '2017-04-02 13:09:13', 5),
(83, 'user3@gmail.com', 'The event test event has been closed.', '2017-04-02 13:09:15', 4),
(85, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-02 13:09:16', 6),
(87, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-02 13:09:31', 6),
(89, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-02 13:10:41', 6),
(91, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-02 13:11:11', 6),
(93, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-02 13:15:12', 6),
(95, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-02 13:15:36', 6),
(97, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-02 13:16:51', 6),
(99, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 14:04:47', 6),
(101, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 14:07:08', 6),
(103, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 14:10:03', 6),
(105, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 14:13:54', 6),
(107, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 14:19:08', 6),
(109, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 14:34:54', 6),
(111, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 14:35:37', 6),
(113, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:04:17', 6),
(115, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:05:20', 6),
(117, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:05:41', 6),
(119, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:11:36', 6),
(121, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:19:09', 6),
(123, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:20:53', 6),
(125, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:22:01', 6),
(127, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:22:51', 6),
(129, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:25:10', 6),
(131, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:25:48', 6),
(133, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:27:26', 6),
(135, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:32:33', 6),
(137, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:34:12', 6),
(139, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:35:43', 6),
(141, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 15:36:22', 6),
(147, 'user1@gmail.com', 'The volunteer Alejandro Morales has cancelled their volunteer request to test event.', '2017-04-03 16:46:02', 3),
(148, 'user1@gmail.com', 'Recieved message from Alejandro Morales for event test event.', '2017-04-03 16:46:12', 7),
(149, 'user1@gmail.com', 'Volunteer request to test event has been accepted.', '2017-04-03 16:46:59', 5),
(150, 'user1@gmail.com', 'Volunteer request to test event has been denied.', '2017-04-03 16:47:01', 2),
(151, 'user1@gmail.com', 'Volunteer request to test event has been accepted.', '2017-04-03 16:47:02', 5),
(152, 'user1@gmail.com', 'The event test event has been reopened.', '2017-04-03 16:47:42', 6),
(153, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 16:47:42', 6),
(154, 'user1@gmail.com', 'The event test event has been closed.', '2017-04-03 16:47:43', 4),
(155, 'user3@gmail.com', 'The event test event has been closed.', '2017-04-03 16:47:43', 4),
(156, 'user1@gmail.com', 'The event test event has been reopened.', '2017-04-03 16:47:45', 6),
(157, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 16:47:45', 6),
(158, 'user1@gmail.com', 'The event test event has been cancelled.', '2017-04-03 16:47:46', 5),
(159, 'user3@gmail.com', 'The event test event has been cancelled.', '2017-04-03 16:47:46', 5),
(160, 'user1@gmail.com', 'The event test event has been reopened.', '2017-04-03 16:47:48', 6),
(161, 'user3@gmail.com', 'The event test event has been reopened.', '2017-04-03 16:47:48', 6);

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `id` int(11) NOT NULL,
  `rater_email` varchar(50) NOT NULL,
  `ratee_email` varchar(50) NOT NULL,
  `event_id` int(11) NOT NULL,
  `rating` double NOT NULL,
  `comment` varchar(1000) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `rater_email`, `ratee_email`, `event_id`, `rating`, `comment`) VALUES
(10, 'user1@gmail.com', 'user1@gmail.com', 1, 5, 'a'),
(11, 'user1@gmail.com', 'user3@gmail.com', 1, 2, 'b'),
(12, 'user1@gmail.com', 'user1@gmail.com', 2, 2, 'c'),
(13, 'user1@gmail.com', 'user1@gmail.com', 3, 1, '');

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
('user1@gmail.com', 1, 'user1@gmail.com', 2),
('user3@gmail.com', 1, 'user1@gmail.com', 2),
('user1@gmail.com', 2, 'user1@gmail.com', 2),
('user1@gmail.com', 3, 'user1@gmail.com', 2);

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
  ADD PRIMARY KEY (`sender_email`,`sendee_email`,`date_sent`,`event_id`),
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
  ADD PRIMARY KEY (`id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=162;
--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
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
