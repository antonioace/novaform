import { useCallback } from "react";

export const useUnitValue = () => {
  const parseValue = useCallback((value: string) => {
    if (!value || value === "auto" || value === "initial" || value === "inherit") {
      return { number: 0, unit: value === "auto" ? "auto" : "px" };
    }
    
    const match = value.match(/^(-?\d*\.?\d+)(.*)$/);
    if (match) {
      const number = parseFloat(match[1]) || 0;
      const unit = match[2] || "px";
      return { number, unit };
    }
    
    return { number: 0, unit: "px" };
  }, []);

  const combineValue = useCallback((number: number, unit: string) => {
    if (unit === "auto") return "auto";
    return `${number}${unit}`;
  }, []);

  return {
    parseValue,
    combineValue,
  };
};

export default useUnitValue; 