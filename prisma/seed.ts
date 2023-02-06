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
      password: `Test123&`
    });
  };

  await prisma.user.createMany({
    data: [...newUsers]
  });

  // ==========----------========== //

  const newPlaylists = [];

  for(let i = 0; i < 50; i++) {
    newPlaylists.push({
      id: `${i}`,
      user_id: `${i + 1}`,
      creator: `User ${i + 1}`,
      title: `Playlist test ${i + 1}`,
      img: '',
      description: `Description de la playlist test n°${i + 1}`,
      date: new Date().toLocaleDateString(),
      average: Math.ceil(i / 10),
      ratings: [5, 4, 3, 4],
      ratings_ids: ['4', '8', '11', '20'],
      nbOfTracks: 0,
      visible: true,
      playable: true
    });
  };

  await prisma.playlist.createMany({
    data: [...newPlaylists]
  });

  // ==========----------========== //

  const newTracks = [];

  for(let i = 0; i < 50; i++) {
    for(let j = 0; j < 10; j++) {
      newTracks.push({
        id: uuidv4(),
        playlist_id: `${i}`,
        youtube_id: `${j}`,
        youtube_title: `Titre youtube ${j}`,
        title: `Titre personnalisé ${j}`,
        artist: `Artiste personnalisé ${j}`,
        img: `https://i.ytimg.com/vi/493R05ifNsI/default.jpg`,
        valid: true
      });
    };
  };

  await prisma.track.createMany({
    data: [...newTracks]
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