-- CreateEnum
CREATE TYPE "MatchPhase" AS ENUM ('GROUP', 'ROUND_OF_16', 'QUARTER_FINAL', 'SEMI_FINAL', 'THIRD_PLACE', 'FINAL');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('SCHEDULED', 'FINISHED');

-- CreateEnum
CREATE TYPE "PlayerPosition" AS ENUM ('GK', 'DEF', 'MID', 'FWD');

-- CreateEnum
CREATE TYPE "TeamRegion" AS ENUM ('CONMEBOL', 'UEFA', 'CONCACAF', 'CAF', 'AFC', 'OFC');

-- CreateEnum
CREATE TYPE "MatchPredictionResult" AS ENUM ('EXACT_SCORE', 'WINNER', 'DRAW', 'WRONG');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_player_id" TEXT,
    "recovery_key" TEXT NOT NULL,
    "name_updated_at" TIMESTAMPTZ(6),
    "avatar_updated_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "region" "TeamRegion",
    "flag_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "team_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "photo_url" TEXT,
    "position" "PlayerPosition" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" UUID NOT NULL,
    "external_id" TEXT,
    "home_team_id" UUID NOT NULL,
    "away_team_id" UUID NOT NULL,
    "winner_team_id" UUID,
    "group" TEXT,
    "phase" "MatchPhase" NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'SCHEDULED',
    "starts_at" TIMESTAMPTZ(6) NOT NULL,
    "score_home" INTEGER,
    "score_away" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_predictions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "match_id" UUID NOT NULL,
    "predicted_home" INTEGER NOT NULL,
    "predicted_away" INTEGER NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "exact_hit" BOOLEAN NOT NULL DEFAULT false,
    "result" "MatchPredictionResult",
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_predictions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "champion_team_id" UUID,
    "runner_up_team_id" UUID,
    "final_home_team_id" UUID,
    "final_away_team_id" UUID,
    "surprise_team_id" UUID,
    "disappointment_team_id" UUID,
    "mvp_player_id" UUID,
    "golden_boot_player_id" UUID,
    "best_goalkeeper_player_id" UUID,
    "revelation_player_id" UUID,
    "points" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tournament_predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_results" (
    "id" UUID NOT NULL,
    "champion_team_id" UUID,
    "runner_up_team_id" UUID,
    "final_home_team_id" UUID,
    "final_away_team_id" UUID,
    "surprise_team_id" UUID,
    "disappointment_team_id" UUID,
    "mvp_player_id" UUID,
    "golden_boot_player_id" UUID,
    "best_goalkeeper_player_id" UUID,
    "revelation_player_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tournament_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderboard_daily" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "total_points" INTEGER NOT NULL DEFAULT 0,
    "exact_hits" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL,
    "previous_rank" INTEGER,
    "rank_delta" INTEGER NOT NULL DEFAULT 0,
    "calculated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "leaderboard_daily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_sync_logs" (
    "id" UUID NOT NULL,
    "endpoint" TEXT NOT NULL,
    "status_code" INTEGER,
    "success" BOOLEAN NOT NULL,
    "message" TEXT,
    "requests_used" INTEGER,
    "remaining_quota" INTEGER,
    "synced_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_recovery_key_key" ON "users"("recovery_key");

-- CreateIndex
CREATE UNIQUE INDEX "teams_external_id_key" ON "teams"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_code_key" ON "teams"("code");

-- CreateIndex
CREATE UNIQUE INDEX "players_external_id_key" ON "players"("external_id");

-- CreateIndex
CREATE INDEX "players_team_id_idx" ON "players"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_external_id_key" ON "matches"("external_id");

-- CreateIndex
CREATE INDEX "matches_phase_idx" ON "matches"("phase");

-- CreateIndex
CREATE INDEX "matches_starts_at_idx" ON "matches"("starts_at");

-- CreateIndex
CREATE INDEX "matches_status_idx" ON "matches"("status");

-- CreateIndex
CREATE INDEX "match_predictions_match_id_idx" ON "match_predictions"("match_id");

-- CreateIndex
CREATE UNIQUE INDEX "match_predictions_user_id_match_id_key" ON "match_predictions"("user_id", "match_id");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_predictions_user_id_key" ON "tournament_predictions"("user_id");

-- CreateIndex
CREATE INDEX "leaderboard_daily_rank_idx" ON "leaderboard_daily"("rank");

-- CreateIndex
CREATE UNIQUE INDEX "leaderboard_daily_user_id_calculated_at_key" ON "leaderboard_daily"("user_id", "calculated_at");

-- CreateIndex
CREATE INDEX "api_sync_logs_synced_at_idx" ON "api_sync_logs"("synced_at");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_winner_team_id_fkey" FOREIGN KEY ("winner_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_predictions" ADD CONSTRAINT "match_predictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_predictions" ADD CONSTRAINT "match_predictions_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_champion_team_id_fkey" FOREIGN KEY ("champion_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_runner_up_team_id_fkey" FOREIGN KEY ("runner_up_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_final_home_team_id_fkey" FOREIGN KEY ("final_home_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_final_away_team_id_fkey" FOREIGN KEY ("final_away_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_surprise_team_id_fkey" FOREIGN KEY ("surprise_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_disappointment_team_id_fkey" FOREIGN KEY ("disappointment_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_mvp_player_id_fkey" FOREIGN KEY ("mvp_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_golden_boot_player_id_fkey" FOREIGN KEY ("golden_boot_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_best_goalkeeper_player_id_fkey" FOREIGN KEY ("best_goalkeeper_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_predictions" ADD CONSTRAINT "tournament_predictions_revelation_player_id_fkey" FOREIGN KEY ("revelation_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_champion_team_id_fkey" FOREIGN KEY ("champion_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_runner_up_team_id_fkey" FOREIGN KEY ("runner_up_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_final_home_team_id_fkey" FOREIGN KEY ("final_home_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_final_away_team_id_fkey" FOREIGN KEY ("final_away_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_surprise_team_id_fkey" FOREIGN KEY ("surprise_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_disappointment_team_id_fkey" FOREIGN KEY ("disappointment_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_mvp_player_id_fkey" FOREIGN KEY ("mvp_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_golden_boot_player_id_fkey" FOREIGN KEY ("golden_boot_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_best_goalkeeper_player_id_fkey" FOREIGN KEY ("best_goalkeeper_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_results" ADD CONSTRAINT "tournament_results_revelation_player_id_fkey" FOREIGN KEY ("revelation_player_id") REFERENCES "players"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaderboard_daily" ADD CONSTRAINT "leaderboard_daily_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
