import { Events } from '../schema/events';

export const mapEvent = (event) => {
  const mappedEvent = {
    checksum: event.checksum,
    description: event.description,
    endTime: event.end_time,
    games: event.games,
    igdbCreatedAt: event.created_at ? new Date(event.created_at * 1000) : null,
    igdbId: event.id,
    igdbUpdatedAt: event.updated_at ? new Date(event.updated_at * 1000) : null,
    liveStreamUrl: event.live_stream_url,
    name: event.name || 'NO_NAME',
    slug: event.slug,
    startTime: event.start_time,
    timeZone: event.time_zone,
    updatedAt: new Date(),
    videos: event.videos,
  } satisfies Events;
  return mappedEvent;
};
