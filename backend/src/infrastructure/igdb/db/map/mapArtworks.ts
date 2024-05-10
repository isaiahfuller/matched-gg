import { Artworks } from '../schema/artworks';

export const mapArtwork = (artwork) => {
  const mappedArtwork = {
    alphaChannel: artwork.alpha_channel || false,
    animated: artwork.animated || false,
    checksum: artwork.checksum,
    game: artwork.game,
    height: artwork.height,
    imageId: artwork.image_id,
    url: artwork.url,
    width: artwork.width,
  } satisfies Artworks;
  return mappedArtwork;
};
