import Image from "next/image";
import { CTAButton } from "./CTAButton";

import { typography, spacing } from "@/shared/constants/designSystem";

export function CTASection() {
  return (
    <section className="text-center pt-5" style={{ marginTop: spacing.xl }}>
      {/* Closing message - MÁS GRANDE */}
      <p
        className="mb-6 text-2xl md:text-4xl font-bold leading-tight"
        style={{
          fontFamily: typography.fontFamily,
        }}
      >
        Llevate a casa la copa más desea por todos
      </p>

      <div className="relative mx-auto mb-10 h-50 w-full max-w-md">
        {/* 26.png backgrounds con opacidad */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Izquierda */}
          <div className="absolute left-0 w-1/2 h-full opacity-20">
            <Image
              src="/26.webp"
              alt=""
              fill
              className="object-cover object-right"
            />
          </div>

          {/* Derecha */}
          <div className="absolute right-0 w-1/2 h-full opacity-20">
            <Image
              src="/26.webp"
              alt=""
              fill
              className="object-cover object-left"
            />
          </div>
        </div>

        {/* Trophy icon al frente - 100% opacidad */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <Image
            src="/cup.webp"
            alt="Trophy"
            width={350}
            height={350}
            className="object-contain"
          />
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6 mb-12 text-center">
        <CTAButton />
      </div>
    </section>
  );
}
