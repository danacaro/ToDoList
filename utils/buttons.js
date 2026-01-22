export const TYPE_BUTTONS = {
  "To Do": "checkbox-outline",
  "Blocked": "add-circle-outline",
  "Idea": "add-circle-outline",
  "Planned": "add-circle-outline",
};

export const COLOR_BUTTONS = {
  "To Do": ["#235523ff", "#3d783dff"],
  "Blocked": ["#3a2355ff", "#603d78ff"],
  "Idea": ["#3a2355ff", "#603d78ff"],
  "Planned": ["#3a2355ff", "#603d78ff"],
};

export const getButtonType = (type) => {
  return TYPE_BUTTONS[type] ?? "arrow-dropleft";
};

export const getButtonColor = (type) => {
  return COLOR_BUTTONS[type] ?? ["#554923ff", "#786d3dff"];
};
