export const noteColors = [
  { color: "blue", bg: "bg-blue-950", ring: "ring-blue-950" },
  { color: "yellow", bg: "bg-yellow-950", ring: "ring-yellow-950" },
  { color: "green", bg: "bg-green-950", ring: "ring-green-950" },
  { color: "rose", bg: "bg-rose-950", ring: "ring-rose-950" },
  { color: "orange", bg: "bg-orange-950", ring: "ring-orange-950" },
  { color: "gray", bg: "bg-slate-800", ring: "ring-slate-800" },
];

export function bgColor(color) {
  switch (color) {
    case "blue":
      return "bg-blue-950";
    case "yellow":
      return "bg-yellow-950";
    case "green":
      return "bg-green-950";
    case "rose":
      return "bg-rose-950";
    case "orange":
      return "bg-orange-950";
    default:
      return "bg-slate-800";
  }
}
