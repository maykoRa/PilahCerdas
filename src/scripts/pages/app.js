import { getActiveRoute } from "../routes/url-parser";
import { generateMainNavigationListTemplate } from "../template"; // Pastikan path ini benar
import { setupSkipToContent, transitionHelper } from "../utils";
import routes from "../routes/routes"; // Pastikan path ini benar

export default class App {
  #content;
  #drawerButton;
  #drawerNavigation;
  #skipLinkButton;
  #header;
  #footer;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;
    this.#header = document.querySelector("header");
    this.#footer = document.querySelector("footer");  // Inisialisasi header di sini

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
    // Panggil #setupNavigationList di sini. Ini akan memastikan
    // konten navigasi selalu diinisialisasi saat aplikasi dimuat.
    this.#setupNavigationList();
  }

  #setupDrawer() {
    // Event listener untuk tombol drawer (membuka/menutup navigasi)
    this.#drawerButton.addEventListener("click", () => {
      this.#drawerNavigation.classList.toggle("open");
    });

    // Event listener untuk menutup drawer saat mengklik di luar drawer atau tombolnya
    document.body.addEventListener("click", (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(event.target);
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      // Jika target klik bukan bagian dari drawer atau tombolnya, tutup drawer
      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove("open");
      }

      // Tutup drawer jika salah satu link di dalam drawer diklik
      this.#drawerNavigation.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove("open");
        }
      });
    });
  }

  #setupNavigationList() {
    const navListMain = this.#drawerNavigation.children.namedItem("navlist-main");

    // Pastikan elemen navlist-main ditemukan sebelum mencoba mengubah innerHTML
    if (!navListMain) {
      console.error('Error: Navigation list main element (navlist-main) not found in the DOM.');
      return;
    }
    // Isi konten navigasi utama menggunakan template yang digenerate
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
      this.#footer.style.display = "none"; 
    } else {
      this.#header.style.display = "";
      this.#footer.style.display = "";  
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
