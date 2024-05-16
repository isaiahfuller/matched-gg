import { EventLogos } from '../schema/eventLogos';

export const mapEventLogo = (logo) => {
  const mappedLogo = {
    alphaChannel: logo.alpha_channel || false,
    animated: logo.animated || false,
    checksum: logo.checksum,
    event: logo.event,
    height: logo.height,
    igdbId: logo.id,
    imageId: logo.image_id,
    url: logo.url,
    updatedAt: new Date(),
    width: logo.width,
  } satisfies EventLogos;
  return mappedLogo;
};
