export const AREA_COLORS = {
  Professional: "#818689ff",
  Responsabilities: "#556fa9ff",
  "Health & Beauty": "#dcac5fff",
  Personal: "#de97bfff",
  Finance: "#7aa665ff",
  Traveling: "#c185d9ff",
  Social: "#efa168ff",
  Home: "#9f875eff",
};

export const getBackgroundColorByType = (area) => {
  return AREA_COLORS[area] ?? "#a3a38cff";
};

export const AREA_ICONS = {
  Professional: "briefcase-outline",
  Responsabilities: "school-outline",
  "Health & Beauty": "fitness-outline",
  Personal: "trending-up-outline",
  Finance: "cash-outline",
  Traveling: "airplane-outline",
  Social: "airplane-outline",
  Home: "airplane-outline",
};

export const getIconByType = (area) => {
  return AREA_ICONS[area] ?? null;
};
