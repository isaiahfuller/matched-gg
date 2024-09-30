import { PlatformLogos } from '../schema/platformLogos';

export const mapPlatformLogo = (artwork) => {
  const mappedArtwork = {
    alphaChannel: artwork.alpha_channel || false,
    animated: artwork.animated || false,
    checksum: artwork.checksum,
    height: artwork.height,
    igdbId: artwork.id,
    imageId: artwork.image_id,
    updatedAt: new Date(),
    url: artwork.url,
    width: artwork.width,
  } satisfies PlatformLogos;
  return mappedArtwork;
};
