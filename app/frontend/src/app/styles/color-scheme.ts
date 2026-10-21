// HeroUI switches to its dark theme only under a "dark" class, so follow the
// system theme on start and whenever it changes.
const darkScheme = matchMedia("(prefers-color-scheme: dark)");

function applyColorScheme() {
    document.documentElement.classList.toggle("dark", darkScheme.matches);
}

applyColorScheme();
darkScheme.addEventListener("change", applyColorScheme);
