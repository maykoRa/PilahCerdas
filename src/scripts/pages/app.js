import { getActiveRoute } from "../routes/url-parser";
import { generateMainNavigationListTemplate } from "../template";
import { setupSkipToContent, transitionHelper } from "../utils";
import routes from "../routes/routes";

export default class App {
  #content;
  #drawerButton;
  #drawerNavigation;
  #skipLinkButton;
  #header;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;
    this.#header = document.querySelector("header");

    this.#init();
  }
  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
  }
  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#drawerNavigation.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(
        event.target
      );
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove("open");
      }

      this.#drawerNavigation.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove("open");
        }
      });
    });
  }
  #setupNavigationList() {
    const navListMain =
      this.#drawerNavigation.children.namedItem("navlist-main");
    navListMain.innerHTML = generateMainNavigationListTemplate();
  }
  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url];

    const adminToken = localStorage.getItem("adminToken");
    const protectedAdminRoutes = ["/admin/dashboard"];

    if (protectedAdminRoutes.includes(url) && !adminToken) {
      console.warn(
        "Unauthorized access to protected admin route. Redirecting to login."
      );
      window.location.hash = "/admin"; 
      return; 
    }

    if (url.startsWith("/admin")) {
      this.#header.style.display = "none"; 
    } else {
      this.#header.style.display = ""; 
      this.#setupNavigationList();
    }

    if (typeof route !== "function") {
      console.error(
        `Error: Route "${url}" is not a function or not defined. Falling back to home.`
      );
      window.location.hash = "/"; 
      return;
    }

    // Get page instance
    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: "instant" });
    });
  }
}
