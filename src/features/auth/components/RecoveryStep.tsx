import { borders } from "@/shared/constants/designSystem";
import { Button } from "@/shared/components/ui/Button";

type RecoveryStepProps = {
  recoveryCode: string;

  username: string;

  isLoading: boolean;

  onEnterApp: () => void;
};

export function RecoveryStep({
  recoveryCode,
  isLoading,
  onEnterApp,
}: RecoveryStepProps) {
  return (
    <div className="mt-7 flex flex-1 flex-col ">
      <h1 className="text-[26px] font-bold uppercase leading-none">
        CODIGO DE RECUPERACION
      </h1>

      <div
        className="mt-8 p-4"
        style={{
          border: borders.default,
        }}
      >
        <p className="text-2xl font-bold uppercase">{recoveryCode}</p>
      </div>

      <p className="mt-4 text-sm  text-[#E61D25]">
        Este código permite recuperar tu usuario si perdés acceso a tu cuenta.
        <br />
        Puedes copiarlo mas adelante en tu perfil.
      </p>

      <Button
        className="mt-8"
        isLoading={isLoading}
        loadingText="Creando usuario..."
        onClick={onEnterApp}
      >
        Crear Cuenta
      </Button>
    </div>
  );
}
