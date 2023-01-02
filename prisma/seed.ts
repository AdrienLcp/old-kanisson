import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {

  const newUsers = [];

  for(let i = 0; i < 50; i++) {
    newUsers.push({
      id: `${i + 1}`,
      pseudo: `User ${i + 1}`,
      email: `user${i + 1}@gmail.com`,
      password: `${i + 1}123abcABC&`
    });
  };

  await prisma.user.createMany({
    data: [...newUsers]
  });

  // ==========----------========== //

  const newPlaylists = [];

  for(let i = 0; i < 50; i++) {
    newPlaylists.push({
      id: uuidv4(),
      user_id: `${i + 1}`,
      creator: `User ${i + 1}`,
      title: `Playlist test ${i + 1}`,
      description: `Description de la playlist test n°${i + 1}`,
      date: new Date().toLocaleDateString(),
      ratings: [5, 4, 3, 4],
      ratings_ids: ['4', '8', '11', '20'],
      songs_ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });
  };

  await prisma.playlist.createMany({
    data: [...newPlaylists]
  });
};

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });