///////// COLORS //////////
export const colors = {
  background: "#1A1A1A",
  primary: "#3CAC3B",
  secondary: "#E61D25",
  tertiary: "#2A398D",
  border: "#666666",
  text: "#FFFFFF",
  mutedText: "#BCBCBC",
};

/////// borders ////////
export const borders = {
  light: "1px solid #3CAC3B",
  default: "1px solid #666666",
  active: "2px solid #3CAC3B",
  button: "4px solid #3CAC3B",
};

// style={{
//   border: borders.default,
// }}

/////// spacing ///////
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
};

/////// typography ///////

export const typography = {
  fontFamily: "Anonymous Pro",

  sizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "22px",
  },
};

/////// states ////////

export const states = {
  disabled: {
    opacity: 0.5,
  },

  completed: {
    border: "1px solid #3CAC3B",
  },

  locked: {
    opacity: 0.4,
  },

  saving: {
    opacity: 0.7,
  },
};
