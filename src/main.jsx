import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/scss/all.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "../src/store/store.js";

// 在 capture 階段攔截，比 stopPropagation 更早執行
document.addEventListener("click", (e) => {
  const toggle = e.target.closest("[data-bs-toggle='dropdown']");
  if (toggle) {
    // 找到對應的 dropdown-menu 並切換
    const dropdownMenu = toggle.closest(".dropdown")?.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      const isOpen = dropdownMenu.classList.contains("show");
      // 先關閉所有已開啟的 dropdown
      document.querySelectorAll(".dropdown-menu.show").forEach((el) => {
        el.classList.remove("show");
        el.closest(".dropdown")?.querySelector("[data-bs-toggle='dropdown']")
          ?.setAttribute("aria-expanded", "false");
      });
      // 若原本是關閉的，則打開
      if (!isOpen) {
        dropdownMenu.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
      }
    }
  } else {
    // 點擊其他地方關閉所有 dropdown
    document.querySelectorAll(".dropdown-menu.show").forEach((el) => {
      el.classList.remove("show");
      el.closest(".dropdown")?.querySelector("[data-bs-toggle='dropdown']")
        ?.setAttribute("aria-expanded", "false");
    });
  }
}, true);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
