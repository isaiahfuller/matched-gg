import { GameVideos } from '../schema/gameVideos';

export const mapGameVideo = (video) => {
  const mapped = {
    checksum: video.checksum,
    game: video.game,
    igdbId: video.id,
    name: video.name,
    updatedAt: new Date(),
    videoId: video.video_id,
  } satisfies GameVideos;
  return mapped;
};
