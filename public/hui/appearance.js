// Apply theme before first paint to avoid a flash.
      (() => {
        try {
          const s = JSON.parse(localStorage.getItem("huihui-settings") || "{}");
          const theme = s.theme === "light" || s.theme === "dark"
            ? s.theme
            : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
          document.documentElement.dataset.theme = theme;
          document.documentElement.dataset.accent = s.accent || "lime";
          document.documentElement.lang = s.lang === "ru" ? "ru" : "en";
          if (s.sidebar === false) document.documentElement.classList.add("sidebar-collapsed");
        } catch {}
      })();
