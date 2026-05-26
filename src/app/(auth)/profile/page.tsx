import { typography } from "@/shared/constants/designSystem";

export default function ProfilePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <h1
        className="text-3xl md:text-4xl font-bold uppercase text-center"
        style={{ fontFamily: typography.fontFamily }}
      >
        Hola soy Perfil
      </h1>
    </div>
  );
}
