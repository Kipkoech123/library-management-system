# Library Management System

A library catalog built with NestJS, Prisma and PostgreSQL.

## Schema Decisions

**Why Book references Genre instead of embedding it**

Each Book stores a `genreId` that points to a row in the Genre table, instead of
copying the genre's details inside every book.

- **One source of truth:** If "Science Fiction" is renamed, I change one Genre row
  and all books reflect it. With embedding, I would have to edit every book.
- **No typos or duplicates:** Genre names live in one place, so I can't end up
  with "Sci-Fi", "SciFi" and "Science Fiction" as three separate genres.
- **Easy queries:** I can list all books in a genre, or count books per genre,
  with a simple relation query.
- **Data integrity:** PostgreSQL's foreign key stops me from creating a book with
  a genre that doesn't exist.

**Other decisions**
- `Role` is an enum (PATRON, LIBRARIAN) so a user can only ever have a valid role.
- `Review` links a User to a Book, with `@@unique([bookId, userId])` so one person
  can leave only one review per book.

**Prisma vs. a document database (what felt different)**
In a document database like MongoDB, I would naturally nest the genre inside each
book. In Prisma, I had to define the structure up front and connect tables with
relations, and the database enforces it. It felt stricter, but it caught mistakes early.