# Documentation for Book Management System

## Overview
The Book Management System is a full-stack application designed for managing books and their related data, including reviews. The system includes features like book search, adding books, displaying books as cards, and handling user authentication. The project is deployed on:

- **Frontend**: [https://wp-demo5.makends.com/](https://wp-demo5.makends.com/)
- **Backend**: [https://api.secretroom.in/](https://api.secretroom.in/)

The API endpoints are accessible at `/api/v1`.

---

## Features
1. **User Authentication**
   - Login functionality with email and password.
2. **Book Management**
   - Search books by title, author, Description.
   - Add new books with details like title, author, genre, and description.
   - Display books as responsive cards.
3. **Reviews**
   - Associate reviews with books.
   - Fetch books with related reviews.

---

## API Endpoints

### Authentication
**POST** `/api/v1/users/login`
```json
{
  "userEmail": "testing@dev.com",
  "userPassword": "testing@dev.com"
}
```
Response:
```json
{
  "status": true,
  "msg": "success",
  "data": {
    "UserData": {
      "id": 1,
      "userID": "***",
      "userFirstName": "***",
      "userSurname": "***",
      "userEmail": "***",
      "userPassword": "***",
      "userPhone": 123,
      "userAddressLine1": "Address 1",
      "userAddressLine2": "Address 2",
      "userAddressPostcode": "***",
      "userGender": "***",
      "userDateOfBirth": "***",
      "userRole": 0,
      "userDateJoined": "***",
      "userDateUpdated": null,
      "userLastLoggedIn": null,
      "userAccountApproved": 1,
      "userDeleted": null,
      "userDeletedDate": null,
      "userMeta": "{\"hairColour\":\"maroon\"}"
    }
  }
}
```

### Get All Books
**GET** `/api/v1/books/?search=<query>`
Response:
```json
[
  {
    "bookID": 1,
    "title": "Test Title",
    "author": "Test Author",
    "description": "Lorem Ipsum",
    "genre": "Fiction",
    "publishDate": "1949-06-08",
    "rating": 4.5
  }
]
```

### Add Book
**POST** `/api/v1/books/`
```json
{
  "title": "Test Title",
  "author": "Test Author",
  "genre": "Fiction",
  "publishDate": "1949-06-08",
  "description": "Lorem Ipsum"
}
```
Response:
```json
{
    "status": true,
    "msg": "success",
    "data": {
        "someData":"***"
    }
}
```

---

## System Architecture

### Frontend
- **Framework**: React.js, Bootstrap
- **Styling**: CSS modules for responsive design.
- **State Management**: React Context API.
- **Deployment**: Hosted at [https://wp-demo5.makends.com/](https://wp-demo5.makends.com/).

### Backend
- **Framework**: Node.js with Express.
- **Database**: MySQL with a relational schema.
- **ORM**: Raw SQL queries for efficiency.
- **Deployment**: Hosted at [https://api.secretroom.in/](https://api.secretroom.in/).

### Key Components
1. **Database Design**
   - `db_books`: Stores book details.
   - `db_reviews`: Stores reviews associated with books.
   - `db_users`: Stores user credentials.
2. **API Layer**
   - Implements RESTful services.
   - Validates inputs to ensure data consistency.

---

## Addressing Challenges

### 1. **Concurrency Control**
- **Problem**: Simultaneous updates to book data could lead to inconsistencies.
- **Solution**:
  - Used SQL transactions to ensure atomicity.
  - Implemented `FOR UPDATE` locks where necessary.

### 2. **Data Consistency**
- **Problem**: Handling relationships between books, users, and reviews without redundant data.
- **Solution**:
  - Normalized the database schema.
  - Used foreign keys to maintain referential integrity.

### 3. **Scalability**
- **Solution**:
  - Optimized SQL queries with indexing.
  - Used pagination for endpoints to handle large datasets efficiently.

---

## README.md

```markdown
# Book Management System

## Overview
This is a full-stack application for managing books and their related data. The system allows users to search, add, and view books along with reviews.

## Live Links
- **Frontend**: [https://wp-demo5.makends.com/](https://wp-demo5.makends.com/)
- **Backend**: [https://api.secretroom.in/](https://api.secretroom.in/)

## Features
1. User Authentication.
2. Book search functionality.
3. Adding new books.
4. Displaying books as responsive cards.
5. Associating and displaying reviews with books.

## Installation

### Frontend
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the following:
   ```env
   REACT_APP_API_SLUG=https://api.secretroom.in/api/v1
   ```
4. Start the server using `npm start`.

### Backend
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the following:
   ```env
    DBHOST = localhost
    DBUSER = root
    DBPASSWORD=
    DATABASE=books
    NODE_PORT=5000
    API_PREFIX=/api/v1/
    JWT_SECRET=your_jwt_secret
   ```
4. Start the server using `npm start`.

## API Endpoints
- **Login**: `POST /api/v1/users/login`
- **Get Books**: `GET /api/v1/books/?search=<query>`
- **Get Books by Id**: `GET /api/v1/books/<bookID>`
- **Add Book**: `POST /api/v1/books/`

you can also use parameters to limit the output eg 25 Booksper API Hit for paginations
- **Get Books**: `GET /api/v1/books/?search=<query>&page=<pageNumber>&limit=<limitPerPage>`