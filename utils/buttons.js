export const TYPE_BUTTONS = {
  Priority: "checkbox-outline",
  "Not started": "add-circle-outline",
};

export const COLOR_BUTTONS = {
  Priority: ["#235523ff", "#3d783dff"],
  "Not started": ["#3a2355ff", "#603d78ff"],
};

export const getButtonType = (type) => {
  return TYPE_BUTTONS[type] ?? "arrow-dropleft";
};

export const getButtonColor = (type) => {
  return COLOR_BUTTONS[type] ?? ["#554923ff", "#786d3dff"];
};
