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