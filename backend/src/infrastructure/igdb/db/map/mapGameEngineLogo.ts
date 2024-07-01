import { GameEngineLogos } from '../schema/gameEngineLogos';

export const mapGameEngineLogo = (logo) => {
  const mapped = {
    alphaChannel: logo.alpha_channel || false,
    animated: logo.animated || false,
    checksum: logo.checksum,
    height: logo.height,
    igdbId: logo.id,
    imageId: logo.image_id,
    updatedAt: new Date(),
    url: logo.url,
    width: logo.width,
  } satisfies GameEngineLogos;
  return mapped;
};
