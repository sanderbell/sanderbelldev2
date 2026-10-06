// Apply theme before first paint to avoid a flash.
      (() => {
        try {
          const s = JSON.parse(localStorage.getItem("huihui-settings") || "{}");
          const theme = s.theme === "light" || s.theme === "dark"
            ? s.theme
            : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
          document.documentElement.dataset.theme = theme;
          document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f8f8f6" : "#101013");
          document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute("content", theme === "light" ? "default" : "black-translucent");
          document.documentElement.dataset.accent = s.accent || "lime";
          document.documentElement.lang = s.lang === "ru" ? "ru" : "en";
          if (s.sidebar === false) document.documentElement.classList.add("sidebar-collapsed");
        } catch {}
      })();
