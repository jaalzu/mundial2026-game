import { typography } from "@/shared/constants/designSystem";

export function Logo() {
  return (
    <div className="flex items-center  ">
      <h1
        className="text-xl md:text-3xl font-bold uppercase "
        style={{ fontFamily: typography.fontFamily }}
      >
        <span className="text-[#2A398D]">MUN</span>
        <span className="text-[#E61D25]">DIAL</span>
        <span className="text-[#3CAC3B]">ITO</span>
        <span className="text-[#FFFFFF]">26</span>
      </h1>
    </div>
  );
}
