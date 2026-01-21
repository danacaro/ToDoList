export const TYPE_COLORS = {
  Work: "#818689ff",
  Academico: "#556fa9ff",
  Health: "#dcac5fff",
  Expandir: "#de97bfff",
  Finance: "#7aa665ff",
  Viajes: "#c185d9ff",
};

export const getBackgroundColorByType = (type) => {
  return TYPE_COLORS[type] ?? "#a3a38cff";
};

export const TYPE_ICONS = {
  Work: "briefcase-outline",
  Academico: "school-outline",
  Health: "fitness-outline",
  Expandir: "trending-up-outline",
  Finance: "cash-outline",
  Viajes: "airplane-outline",
};

export const getIconByType = (type) => {
  return TYPE_ICONS[type] ?? null;
};
