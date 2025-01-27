// new booking modal
// bookingID 	bookingUserID 	bookingTeamID 	bookingMemberCount 	bookingStartDate 	bookingEndDate 	bookingCreatedAt 	bookingModifiedAt 	bookingProductID 	bookingProductLevelID 	bookingTransactionID 	bookingTransactionProcessorID 	bookingTransactionProcessor 	bookingTransactionStatus 	bookingTransactionAmount 	bookingMeta 

/**
 * @name Booking Entity
 */
module.exports.Booking = class Booking {
    constructor({
        bookingID,
        bookingUserID,
        bookingTeamID,
        bookingMemberCount,
        bookingStartDate,
        bookingEndDate,
        bookingCreatedAt,
        bookingModifiedAt,
        bookingProductID,
        bookingProductLevelID,
        bookingTransactionID,
        bookingTransactionProcessorID,
        bookingTransactionProcessor,
        bookingTransactionStatus,
        bookingTransactionAmount,
        bookingMeta = {},
    }) {
        this.bookingID = bookingID;
        this.bookingUserID = bookingUserID;
        this.bookingTeamID = bookingTeamID;
        this.bookingMemberCount = bookingMemberCount;
        this.bookingStartDate = bookingStartDate;
        this.bookingEndDate = bookingEndDate;
        this.bookingCreatedAt = bookingCreatedAt;
        this.bookingModifiedAt = bookingModifiedAt;
        this.bookingProductID = bookingProductID;
        this.bookingProductLevelID = bookingProductLevelID;
        this.bookingTransactionID = bookingTransactionID;
        this.bookingTransactionProcessorID = bookingTransactionProcessorID;
        this.bookingTransactionProcessor = bookingTransactionProcessor;
        this.bookingTransactionStatus = bookingTransactionStatus;
        this.bookingTransactionAmount = bookingTransactionAmount;
        this.bookingMeta = bookingMeta;
    }
}

const bookingTransactionStatus = {
    PENDING: '0',
    SUCCESS: '1',
    FAILED: '2',
    CANCELLED: '3',
    PARTIAL_REFUNDED: '4',
    REFUNDED: '5',
};

module.exports.bookingConstants = {
    bookingTransactionStatus,
};
