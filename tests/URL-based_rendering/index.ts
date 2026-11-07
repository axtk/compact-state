import { Route } from "../../src/Route.ts";
import "./index.css";

const route = new Route();

route.on("navigationcomplete", () => {
  renderHeader();
  renderMainContent();
});

// Enable SPA navigation with HTML links
route.observe(document);

function renderHeader() {
  // `at(url, x, y)` acts like `atURL ? x : y`
  document.querySelector("header")!.className = route.at(
    "/",
    "full",
    "compact",
  );
}

function renderMainContent() {
  // `ok` is `true` if the current URL matches the given URL pattern.
  // `params` contains the capturing groups from the RegExp URL pattern.
  const { ok: isSection, params } = route.match(/^\/sections\/(?<id>\d+)\/?/);

  if (isSection)
    document.querySelector('[data-id="section"] h2 span')!.textContent =
      params.id ?? "";

  document
    .querySelector('main[data-id="intro"]')!
    .toggleAttribute("hidden", isSection);

  document
    .querySelector('main[data-id="section"]')!
    .toggleAttribute("hidden", !isSection);

  document.body.removeAttribute("hidden");
}
