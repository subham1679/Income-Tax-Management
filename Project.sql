-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 26, 2020 at 04:05 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Project`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(1, 'amanku', '$2a$10$2Xb1Q9IWN2aPBpxmDOZ4DehDuKe/ZQYJCzOLI176d/dSGd6sCFjlC');

-- --------------------------------------------------------

--
-- Table structure for table `gross_income`
--

CREATE TABLE `gross_income` (
  `person_id` int(11) NOT NULL,
  `ann_inc` int(11) DEFAULT NULL,
  `house_inc` int(11) DEFAULT NULL,
  `other` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gross_income`
--

INSERT INTO `gross_income` (`person_id`, `ann_inc`, `house_inc`, `other`) VALUES
(1, 500000, 50000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tax`
--

CREATE TABLE `tax` (
  `tax_id` int(11) NOT NULL,
  `person_id` int(11) DEFAULT NULL,
  `tax_amt` int(11) DEFAULT NULL,
  `ITR_date` varchar(20) DEFAULT NULL,
  `ann_tot_inc` int(11) DEFAULT NULL,
  `tax_per` varchar(5) DEFAULT NULL,
  `inc_afr_tax` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tax`
--

INSERT INTO `tax` (`tax_id`, `person_id`, `tax_amt`, `ITR_date`, `ann_tot_inc`, `tax_per`, `inc_afr_tax`) VALUES
(1, 1, 20000, '21-11-2020', 550000, '10%', 530000);

-- --------------------------------------------------------

--
-- Table structure for table `tax_payer`
--

CREATE TABLE `tax_payer` (
  `person_id` int(11) NOT NULL,
  `f_name` varchar(30) DEFAULT NULL,
  `l_name` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(10000) DEFAULT NULL,
  `dob` varchar(30) DEFAULT NULL,
  `aadhar_no` varchar(50) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `noe` varchar(20) DEFAULT NULL,
  `addr_1` varchar(100) DEFAULT NULL,
  `addr_2` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `pincode` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tax_payer`
--

INSERT INTO `tax_payer` (`person_id`, `f_name`, `l_name`, `email`, `password`, `dob`, `aadhar_no`, `mobile`, `noe`, `addr_1`, `addr_2`, `city`, `state`, `pincode`) VALUES
(1, 'Aman', 'Kumar', 'a@gmail.com', '$2a$10$/XhgcZceWTYm1ECOAh.FOuOCyzkzxzInuYZ8Ry2B5V4YKolIuyL02', '21-11-2000', '2817293084', '9120890612', 'PSU', 'Indira Nagar', 'prakash lok', 'lucknow', 'Uttar Pradesh', 223090);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gross_income`
--
ALTER TABLE `gross_income`
  ADD PRIMARY KEY (`person_id`);

--
-- Indexes for table `tax`
--
ALTER TABLE `tax`
  ADD PRIMARY KEY (`tax_id`);

--
-- Indexes for table `tax_payer`
--
ALTER TABLE `tax_payer`
  ADD PRIMARY KEY (`person_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tax`
--
ALTER TABLE `tax`
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tax_payer`
--
ALTER TABLE `tax_payer`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gross_income`
--
ALTER TABLE `gross_income`
  ADD CONSTRAINT `gross_income_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `tax_payer` (`person_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
