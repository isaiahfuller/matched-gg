import { Screenshots } from '../schema/screenshots';

export const mapScreenshot = (screenshot) => {
  const mapped = {
    alphaChannel: screenshot.alpha_channel || false,
    animated: screenshot.animated || false,
    checksum: screenshot.checksum,
    game: screenshot.game,
    height: screenshot.height,
    igdbId: screenshot.id,
    imageId: screenshot.image_id,
    updatedAt: new Date(),
    url: screenshot.url,
    width: screenshot.width,
  } satisfies Screenshots;
  return mapped;
};
