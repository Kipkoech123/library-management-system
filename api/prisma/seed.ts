import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  const fiction = await prisma.genre.create({ data: { name: 'Fiction' } });
  const scifi = await prisma.genre.create({ data: { name: 'Science Fiction' } });
  const history = await prisma.genre.create({ data: { name: 'History' } });
  const tech = await prisma.genre.create({ data: { name: 'Technology' } });

  await prisma.book.createMany({
    data: [
      { title: 'Things Fall Apart', author: 'Chinua Achebe', publishedYear: 1958, copies: 4, genreId: fiction.id },
      { title: 'Weep Not, Child', author: 'Ngugi wa Thiongo', publishedYear: 1964, copies: 3, genreId: fiction.id },
      { title: 'The Alchemist', author: 'Paulo Coelho', publishedYear: 1988, copies: 5, genreId: fiction.id },
      { title: 'Half of a Yellow Sun', author: 'Chimamanda Ngozi Adichie', publishedYear: 2006, copies: 2, genreId: fiction.id },

      { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965, copies: 3, genreId: scifi.id },
      { title: 'Neuromancer', author: 'William Gibson', publishedYear: 1984, copies: 2, genreId: scifi.id },
      { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', publishedYear: 1969, copies: 2, genreId: scifi.id },
      { title: 'Foundation', author: 'Isaac Asimov', publishedYear: 1951, copies: 4, genreId: scifi.id },

      { title: 'Sapiens', author: 'Yuval Noah Harari', publishedYear: 2011, copies: 5, genreId: history.id },
      { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', publishedYear: 1997, copies: 3, genreId: history.id },
      { title: 'A Short History of Africa', author: 'Roland Oliver and J. D. Fage', publishedYear: 1962, copies: 2, genreId: history.id },
      { title: 'The Dawn of Everything', author: 'David Graeber and David Wengrow', publishedYear: 2021, copies: 2, genreId: history.id },

      { title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008, copies: 3, genreId: tech.id },
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas', publishedYear: 1999, copies: 3, genreId: tech.id },
      { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', publishedYear: 2011, copies: 4, genreId: tech.id },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', publishedYear: 2017, copies: 2, genreId: tech.id },
    ],
  });

  console.log('Seeded 4 genres and 16 books');
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(() => prisma.$disconnect());