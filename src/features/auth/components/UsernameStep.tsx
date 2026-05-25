import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

type UsernameStepProps = {
  username: string;
  onUsernameChange: (value: string) => void;
  onNext: () => void;
};

export function UsernameStep({
  username,
  onUsernameChange,
  onNext,
}: UsernameStepProps) {
  const isValid =
    username.length >= 3 &&
    username.length <= 20 &&
    /^[A-Z0-9_]+$/i.test(username);

  return (
    <div className="mt-7 flex flex-1 flex-col">
      <h1 className="text-[26px] font-bold uppercase">Elegí tu username</h1>

      <div className="mt-6">
        <Input
          autoComplete="off"
          placeholder="Username"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          isCompleted={isValid}
        />
      </div>

      <div className="pt-8">
        <Button disabled={!isValid} onClick={onNext}>
          Siguiente paso
        </Button>
      </div>
    </div>
  );
}
