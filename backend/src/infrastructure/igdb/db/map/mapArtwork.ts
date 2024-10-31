import { Artworks } from '../schema/artworks';
import { Covers } from '../schema/covers';

export const mapArtwork = (artwork) => {
  const mappedArtwork = {
    alphaChannel: artwork.alpha_channel || false,
    animated: artwork.animated || false,
    checksum: artwork.checksum,
    game: artwork.game,
    game_localization: artwork.game_localization,
    height: artwork.height,
    igdbId: artwork.id,
    imageId: artwork.image_id,
    updatedAt: new Date(),
    url: artwork.url,
    width: artwork.width,
  } satisfies Artworks | Covers;
  return mappedArtwork;
};
