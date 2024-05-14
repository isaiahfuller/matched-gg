import { Artworks, Covers } from '../schema/artworks';

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
    url: artwork.url,
    updatedAt: new Date(),
    width: artwork.width,
  } satisfies Artworks | Covers;
  return mappedArtwork;
};
