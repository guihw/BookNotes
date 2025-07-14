# Book Notes Project

A simple and intuitive web application for managing your personal book notes and reviews. Keep track of your reading journey by creating, editing, and organizing notes for books you've read.

## Demo
<img width="942" height="413" alt="criarAnotacao" src="https://github.com/user-attachments/assets/503f171e-ba5b-43c7-b25e-615a504652c3" />


https://github.com/user-attachments/assets/bde26dad-8d4f-4380-a905-3b3ad560340d




## Features

- **CRUD Operations**: Create, read, update, and delete book notes
- **Automatic Book Data Fetching**: Enter an ISBN number to automatically fetch book title and cover image
- **Flexible Sorting**: Filter and sort your notes by:
  - Most recent
  - Oldest
  - Alphabetically by book title
- **Clean Interface**: Simple, user-friendly design for easy note management

## Technology Stack

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling and responsive design
- **JavaScript**: Client-side interactivity
- **EJS**: Dynamic templating engine

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **Axios**: HTTP client for API requests

### Database
- **PostgreSQL**: Relational database for data persistence

### External API
- **Open Library API**: Fetches book metadata (title and cover) using ISBN
  - No authentication required
  - Provides reliable book information

## Database Schema

The application uses a simple PostgreSQL table structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | PRIMARY KEY | Unique identifier for each note |
| `isbn` | VARCHAR | International Standard Book Number |
| `title` | VARCHAR | Book title (fetched from Open Library API) |
| `note` | TEXT | User's personal notes and thoughts |

## Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd book-notes-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a new PostgreSQL database
   - Update database connection settings in your configuration file
   - Run the database schema setup (create the notes table)

4. **Configure environment variables**
   ```bash
   # Create a .env file with your database credentials
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=book_notes
   DB_USER=your_username
   DB_PASSWORD=your_password
   ```

5. **Start the application**
   ```bash
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Usage

### Adding a New Book Note

1. Enter the ISBN number of the book
2. The application automatically fetches the book title and cover image from Open Library API
3. Write your personal notes about the book
4. Save the note to your collection

### Managing Your Notes

- **View All Notes**: Browse through your complete collection
- **Edit Notes**: Update your thoughts and observations
- **Delete Notes**: Remove notes you no longer need
- **Sort & Filter**: Organize your notes by date or alphabetically

### Sorting Options

- **Most Recent**: See your latest additions first
- **Oldest**: View your earliest notes at the top
- **Alphabetical**: Sort by book title A-Z for easy browsing

## API Integration

The application integrates with the Open Library API to provide rich book metadata:

- **Endpoint**: Book cover https://covers.openlibrary.org/b/$key/$value-$size.jpg
                Book title https://openlibrary.org/isbn/${isbn}.json
- **Data Retrieved**: Book title and cover image
- **Input**: ISBN-10 or ISBN-13
- **Authentication**: None required


## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## Future Enhancements

Potential features for future development:
- User authentication and profiles
- Book ratings and review system
- Export notes to PDF or other formats
