-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2021 at 12:01 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `followings`
--

CREATE TABLE `followings` (
  `tagId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followings`
--

INSERT INTO `followings` (`tagId`, `userId`, `vacationId`) VALUES
(1, 2, 2),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `userPass` varchar(15) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `userPass`, `isAdmin`) VALUES
(1, 'rikarose', 'allmighty', 1),
(2, 'mishmosh', '1234', 0),
(3, 'trilili-tralala', '4321', 0),
(4, 'Jonny', '1234', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `image` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `start_date` varchar(10) NOT NULL,
  `end_date` varchar(10) NOT NULL,
  `price` int(11) NOT NULL,
  `followers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `image`, `description`, `start_date`, `end_date`, `price`, `followers`) VALUES
(1, 'Prague', 'https://qtxasset.com/cdn-cgi/image/w=852,h=479,f=auto,fit=crop,g=0.5x0.5/https://qtxasset.com/quartz/qcloud1/media/image/hotelmanagement/1580732928/Prague%20-%20Tyn%20church%20and%20Old%20Town%20-%20', '7 Days in beautiful Prague - come and experience all this medieval pearl has to offer.', '2021-08-22', '2021-08-28', 1899, 0),
(2, 'London', 'https://i.natgeofe.com/n/93231b5d-3b4f-4bd6-bcf4-4172ebda2011/parliment-square-london-england.jpg', 'London awaits you! hear it\'s call and come see for yourself what all the fuss is about.', '2021-09-05', '2021-09-10', 1489, 0),
(3, 'Crete', 'https://theplanetd.com/images/things-to-do-in-crete-greece.jpg', 'Care for a sunbath? Come to a long needed vacation, and relax on the beach with a cold cocktail.', '2021-08-04', '2021-08-09', 899, 0),
(4, 'Venice', 'https://www.ship-technology.com/wp-content/uploads/sites/16/2020/08/shutterstock_720444505_800x.jpg', 'Forgot Valentines? Book this romantic vacation now and she\'ll never know.', '2021-09-25', '2021-09-30', 1549, 0),
(5, 'Rome', 'https://media-cdn.tripadvisor.com/media/photo-s/16/c5/cc/5c/shared-shuttle-rome-fco.jpg', 'Foodies - this one\'s for you! Come for a culinary treat in the Italian capitol.', '2021-10-08', '2021-10-15', 1479, 0),
(6, 'Jerusalem', ' dfhdhdfghg', 'sfhshdfhD', '23/45/12', ' 56/12', 3534, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followings`
--
ALTER TABLE `followings`
  ADD PRIMARY KEY (`tagId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followings`
--
ALTER TABLE `followings`
  MODIFY `tagId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
