import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        visible: true,
        playable: true
      }
    });

    const playlistsList = [...playlists];
    const randomPlaylists = [];

    // Common function to get random number between min & max value
    const getRandomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // For each playlist in database
    for(let i = 0; i < playlists.length; i++) {

      // Get a random number between 0 & number of playlists
      const randomIndex = getRandomNumber(0, playlistsList.length - 1);

      // Use this number as index to select a random playlist in list
      const randomPlaylist = playlistsList[randomIndex];

      // & push it in randomTracks array
      randomPlaylists.push(randomPlaylist);

      // Delete this selected track to not have double
      playlistsList.splice(randomIndex, 1);
    };

    res.status(200).json(randomPlaylists);

  } catch (error){
    res.status(404).json(error);
  };
};