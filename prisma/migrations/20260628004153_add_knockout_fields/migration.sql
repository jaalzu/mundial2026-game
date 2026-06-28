-- AlterEnum
ALTER TYPE "MatchPhase" ADD VALUE 'ROUND_OF_8';

-- AlterTable
ALTER TABLE "match_predictions" ADD COLUMN     "predicted_penalty_winner_id" UUID;

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "bracket" INTEGER,
ALTER COLUMN "home_team_id" DROP NOT NULL,
ALTER COLUMN "away_team_id" DROP NOT NULL,
ALTER COLUMN "starts_at" DROP NOT NULL;
