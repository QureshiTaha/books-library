
CREATE TABLE `db_books` (
  `id` int(11) NOT NULL,
  `bookID` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `genre` varchar(100) NOT NULL,
  `publishDate` date DEFAULT NULL,
  `rating` float DEFAULT 0,
  `coverImage` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `db_preferences`
--

CREATE TABLE `db_preferences` (
  `id` int(11) NOT NULL,
  `userID` varchar(100) NOT NULL,
  `preferenceKey` varchar(100) NOT NULL,
  `preferenceValue` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `db_reviews`
--

CREATE TABLE `db_reviews` (
  `id` int(11) NOT NULL,
  `userID` varchar(100) NOT NULL,
  `bookID` varchar(100) NOT NULL,
  `review` text NOT NULL,
  `rating` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `db_sessions`
--

CREATE TABLE `db_sessions` (
  `id` int(11) NOT NULL,
  `userID` varchar(100) NOT NULL,
  `sessionToken` varchar(255) NOT NULL,
  `expiresAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `db_users`
--

CREATE TABLE `db_users` (
  `id` int(11) NOT NULL,
  `userID` varchar(100) NOT NULL,
  `userFirstName` varchar(100) NOT NULL,
  `userSurname` varchar(100) NOT NULL,
  `userEmail` varchar(50) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userPhone` int(11) NOT NULL,
  `userAddressLine1` varchar(255) NOT NULL,
  `userAddressLine2` varchar(255) NOT NULL,
  `userAddressPostcode` varchar(255) NOT NULL,
  `userGender` varchar(255) NOT NULL,
  `userDateOfBirth` date DEFAULT NULL,
  `userRole` int(11) NOT NULL DEFAULT 1,
  `userDateJoined` date DEFAULT current_timestamp(),
  `userDateUpdated` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userLastLoggedIn` date DEFAULT NULL,
  `userAccountApproved` tinyint(4) DEFAULT 1,
  `userDeleted` tinyint(4) DEFAULT NULL,
  `userDeletedDate` datetime DEFAULT NULL,
  `userMeta` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `db_wishlist`
--

CREATE TABLE `db_wishlist` (
  `id` int(11) NOT NULL,
  `userID` varchar(100) NOT NULL,
  `bookID` varchar(100) NOT NULL,
  `addedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `db_books`
--
ALTER TABLE `db_books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bookID` (`bookID`);

--
-- Indexes for table `db_preferences`
--
ALTER TABLE `db_preferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `db_reviews`
--
ALTER TABLE `db_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `bookID` (`bookID`);

--
-- Indexes for table `db_sessions`
--
ALTER TABLE `db_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `db_users`
--
ALTER TABLE `db_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userID` (`userID`);

--
-- Indexes for table `db_wishlist`
--
ALTER TABLE `db_wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`userID`),
  ADD KEY `bookID` (`bookID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `db_books`
--
ALTER TABLE `db_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `db_preferences`
--
ALTER TABLE `db_preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `db_reviews`
--
ALTER TABLE `db_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `db_sessions`
--
ALTER TABLE `db_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `db_users`
--
ALTER TABLE `db_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `db_wishlist`
--
ALTER TABLE `db_wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `db_preferences`
--
ALTER TABLE `db_preferences`
  ADD CONSTRAINT `db_preferences_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `db_users` (`userID`) ON DELETE CASCADE;

--
-- Constraints for table `db_reviews`
--
ALTER TABLE `db_reviews`
  ADD CONSTRAINT `db_reviews_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `db_users` (`userID`) ON DELETE CASCADE,
  ADD CONSTRAINT `db_reviews_ibfk_2` FOREIGN KEY (`bookID`) REFERENCES `db_books` (`bookID`) ON DELETE CASCADE;

--
-- Constraints for table `db_sessions`
--
ALTER TABLE `db_sessions`
  ADD CONSTRAINT `db_sessions_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `db_users` (`userID`) ON DELETE CASCADE;

--
-- Constraints for table `db_wishlist`
--
ALTER TABLE `db_wishlist`
  ADD CONSTRAINT `db_wishlist_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `db_users` (`userID`) ON DELETE CASCADE,
  ADD CONSTRAINT `db_wishlist_ibfk_2` FOREIGN KEY (`bookID`) REFERENCES `db_books` (`bookID`) ON DELETE CASCADE;
COMMIT;
