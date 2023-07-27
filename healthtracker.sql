-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2023 at 04:46 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthtracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `life_style_diseases`
--

CREATE TABLE `life_style_diseases` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `life_style_diseases`
--

INSERT INTO `life_style_diseases` (`id`, `name`) VALUES
(1, 'Sugar'),
(2, 'thyroid'),
(3, 'bp');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `name`, `phone`, `email`, `address`, `lat`, `lng`, `password`, `dob`) VALUES
(1, 'Ram Gopal', '9867543212', 'ram@gmail.com', '143, R.K. Road , Hooghly , West Bengal , 734245', '80.354354', '102.46454353', 'ram123', '2003-12-01'),
(2, 'sam pal', '9876534543', 'sam@gmail.com', '176, S.K. Street , 24 pgs(n), 702111', '80.534533', '102.73647364', 'sam123', '2003-01-02');

-- --------------------------------------------------------

--
-- Table structure for table `p_d`
--

CREATE TABLE `p_d` (
  `patient_id` int(10) NOT NULL,
  `lsd_id` int(10) NOT NULL,
  `duration` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `p_d`
--

INSERT INTO `p_d` (`patient_id`, `lsd_id`, `duration`) VALUES
(1, 1, 5),
(1, 3, 2),
(2, 2, 8),
(2, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `life_style_diseases`
--
ALTER TABLE `life_style_diseases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `life_style_diseases`
--
ALTER TABLE `life_style_diseases`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
