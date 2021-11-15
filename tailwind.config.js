module.exports = {
  purge: ["./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "3-1": "3fr 1fr",
      },
      backgroundImage: {
        "hero-pattern": "url('../img/tic-tac-toe.svg')",
        cat: "url('../img/cat.jpeg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
