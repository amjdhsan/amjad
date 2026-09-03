// theme switcher — the pre-paint script in <head> has already applied the
// stored (or system) theme, so this only keeps the icon in sync and wires
// up the toggle.
const themeToggleButton = document.querySelector(".theme-toggle");
const themeToggleIconReference = themeToggleButton.querySelector("use");
const prefersDarkColorScheme = window.matchMedia("(prefers-color-scheme: dark)");

updateThemeIcon(document.documentElement.getAttribute("data-theme"));

themeToggleButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

// follow the system theme until an explicit choice has been stored
prefersDarkColorScheme.addEventListener("change", (colorSchemeChangeEvent) => {
  if (localStorage.getItem("theme")) return;

  const systemTheme = colorSchemeChangeEvent.matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", systemTheme);
  updateThemeIcon(systemTheme);
});

// the moon offers dark mode; the sun offers the way back
function updateThemeIcon(theme) {
  themeToggleIconReference.setAttribute(
    "href",
    theme === "light" ? "#icon-moon" : "#icon-sun",
  );
}
