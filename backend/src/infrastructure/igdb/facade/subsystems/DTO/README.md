# DTO Split by Non-Ref Values and Referential Values

In the IGDB database, the DTOs (Data Transfer Objects) are split into two categories based on the values they contain: non-ref values and referential values.

## Non-Ref Values

Non-ref values in DTOs are the values that do not reference other objects in the IGDB database. These values are typically simple data types such as strings, numbers, booleans, or dates. They represent standalone information that doesn't rely on other objects for context.

For example, a DTO representing a game might have non-ref values for the game's title, release date, genre, and platform. These values can be directly accessed and used without needing to fetch additional data from other objects.

## Referential Values

Referential values in DTOs are the values that reference other objects in the IGDB database. These values establish relationships between different objects and allow for more complex data retrieval.

For example, a DTO representing a game might have referential values for the game's publisher, developer, and screenshots. These values are not the actual data themselves but rather references to other objects in the database. To access the full information of these referential values, additional queries or API calls may be required to fetch the related objects.

By splitting the DTOs based on non-ref values and referential values, it becomes easier to manage and process the data from the IGDB database. Developers can efficiently retrieve and utilize the non-ref values, while also having the flexibility to fetch and work with the related objects through the referential values.

## Naming Convention

Non-ref types are named with the prefix `NR` and DTO that include referential values do not contain a prefix. This naming convention helps to distinguish between the two types of DTOs and indicates whether additional data retrieval is needed to access the full information.
