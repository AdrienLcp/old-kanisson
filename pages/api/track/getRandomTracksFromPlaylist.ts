import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/prisma';

export default async function handle (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tracks = await db.track.findMany({
      where: {
        playlist_id: req.body.playlist_id,
        valid: true
      }
    });

    const tracksList = [...tracks];
    const randomTracks = [];

    // Common function to get random number between min & max value
    const getRandomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    // Get 10 random tracks from playlist
    for(let i = 0; i < 10; i++) {
      // Get a random number between 0 & number of tracks
      const randomIndex = getRandomNumber(0, tracksList.length - 1);

      // Use this number as index to select a random track in list
      const randomTrack = tracksList[randomIndex];

      // & push it in randomTracks array
      randomTracks.push(randomTrack);

      // Delete this selected track to not have double
      tracksList.splice(randomIndex, 1);
    };

    res.status(200).json(randomTracks);

  } catch (error){
    res.status(404).json(error);
  };
};