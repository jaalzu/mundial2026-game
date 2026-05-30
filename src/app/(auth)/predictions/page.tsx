import { Suspense } from "react";
import { PredictionsLoader } from "./PredictionsLoader";
import { PredictionsSkeleton } from "@/features/predictions/components/shared/PredictionsSkeleton";

export default function PredictionsPage() {
  return (
    <Suspense fallback={<PredictionsSkeleton />}>
      <PredictionsLoader />
    </Suspense>
  );
}
