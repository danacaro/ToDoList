export const TYPE_COLORS = {
  Work: "#818689ff",
  Academico: "#556fa9ff",
  Health: "#dcac5fff",
  Expandir: "#de97bfff",
  Finance: "#9ddc80ff",
  Viajes: "#c185d9ff",
};

export const getBackgroundColorByType = (type) => {
  return TYPE_COLORS[type] ?? "#55854aff";
};
