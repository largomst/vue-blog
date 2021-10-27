module.exports = {
  purge: ["./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "3-1": "3fr 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
