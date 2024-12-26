export function getColor(score: number): { bg: string; border: string } {
  if (score >= 0 && score <= 4) {
    return { bg: "bg-red-500", border: "border-red-500" };
  } else if (score >= 5 && score <= 7) {
    return { bg: "bg-yellow-500", border: "border-yellow-500" };
  } else if (score >= 8 && score <= 10) {
    return { bg: "bg-green-500", border: "border-green-500" };
  } else {
    return { bg: "bg-gray-500", border: "border-gray-500" };
  }
}
