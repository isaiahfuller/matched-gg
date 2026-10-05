-- Rebuild missing links from existing IGDB metadata without changing saved links.
INSERT INTO igdb_steam_connect (steam_id, igdb_id)
SELECT DISTINCT ON (substring(w.url from 'https://store[.]steampowered[.]com/app/([0-9]+)')::bigint)
  substring(w.url from 'https://store[.]steampowered[.]com/app/([0-9]+)')::bigint,
  g.igdb_id
FROM websites w
JOIN games g ON g.igdb_id = w.game
WHERE w.type = 13
  AND g.game_type IN (9, 10, 11, 8, 5, 4, 0, 12, 3)
  AND w.url ~ 'https://store[.]steampowered[.]com/app/[0-9]+'
ORDER BY 1, g.igdb_id DESC
ON CONFLICT (steam_id) DO NOTHING;
