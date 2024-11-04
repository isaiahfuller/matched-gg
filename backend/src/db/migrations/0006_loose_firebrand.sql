ALTER TABLE "game_multiplayerModes" RENAME TO "game_multiplayer_modes";--> statement-breakpoint
ALTER TABLE "game_multiplayer_modes" DROP CONSTRAINT "game_multiplayerModes_multiplayer_mode_id_game_id_unique";--> statement-breakpoint
ALTER TABLE "game_multiplayer_modes" ADD CONSTRAINT "game_multiplayer_modes_multiplayer_mode_id_game_id_unique" UNIQUE("multiplayer_mode_id","game_id");