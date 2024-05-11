import {
  CollectionMembership,
  CollectionMembershipTypePGEnum,
} from '../schema/collectionMembership';

export const mapCollectionMembership = (membership) => {
  const mappedMembership = {
    igdbId: membership.id,
    checksum: membership.checksum,
    collection: membership.collection,
    igdbCreatedAt: membership.created_at
      ? new Date(membership.created_at * 1000)
      : null,

    igdbUpdatedAt: membership.updated_at
      ? new Date(membership.updated_at * 1000)
      : null,
    game: membership.game,
    type:
      membership.type === undefined
        ? null
        : CollectionMembershipTypePGEnum.enumValues[membership.type],
    updatedAt: new Date(),
  } satisfies CollectionMembership;
  return mappedMembership;
};
