import {
  CollectionMembership,
  CollectionMembershipTypePGEnum,
} from '../schema/collectionMembership';

export const mapCollectionMembership = (membership) => {
  const mappedMembership = {
    checksum: membership.checksum,
    collection: membership.collection,
    game: membership.game,
    igdbCreatedAt: membership.created_at
      ? new Date(membership.created_at * 1000)
      : null,

    igdbId: membership.id,
    igdbUpdatedAt: membership.updated_at
      ? new Date(membership.updated_at * 1000)
      : null,
    type:
      membership.type === undefined
        ? null
        : CollectionMembershipTypePGEnum.enumValues[membership.type],
    updatedAt: new Date(),
  } satisfies CollectionMembership;
  return mappedMembership;
};
