import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const Navbar = () => {
  useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return /* @__PURE__ */ jsxs("nav", { className: "yrelative ybg-white yz-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "yflex yitems-center yjustify-between ypx-4 ypy-2", children: [
      /* @__PURE__ */ jsx("a", { href: "/about", children: " A propos" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "ytext-black hover:ytext-blue-200 yp-4 yflex yitems-center",
          children: /* @__PURE__ */ jsx("img", { src: "./favicon.ico", alt: "Logo", className: "h-8 w-8" })
        }
      ),
      /* @__PURE__ */ jsx("div", { onClick: toggleMenu, className: "cursor-pointer", children: isMenuOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "yh-6 yw-6 ytext-black" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "yh-6 yw-6 ytext-black" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "yabsolute ybottom-0 yleft-0 yw-full yh-1 ybg-gradient-to-r yfrom-blue-900 yvia-blue-500 yto-transparent" }),
    isMenuOpen && /* @__PURE__ */ jsxs("div", { className: "yabsolute ytop-full yleft-0 yw-full ybg-white yshadow-md ybg-opacity-80", children: [
      /* @__PURE__ */ jsxs("ul", { className: "yflex yjustify-around", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/rendez-vous", className: "yblock ypx-4 ypy-2 ytext-black", children: "prendre rendez vous" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/contacts", className: "yblock ypx-4 ypy-2 ytext-black", children: "contacts" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/commandes", className: "yblock ypx-4 ypy-2 ytext-black", children: "ma commandes" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "yabsolute ybottom-0 yleft-0 yw-full yh-1 ybg-gradient-to-l yfrom-blue-900 yvia-blue-500 yto-transparent" })
    ] })
  ] });
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const images = [
  {
    name: "Template",
    src: "./images/template.jpeg",
    alt: "Template",
    favorite: false,
    number: 1,
    themes: ["Template"]
  },
  {
    name: "Assasiation Classroom",
    src: "./images/AC_modified.png",
    alt: "Assasiation Classroom",
    favorite: true,
    number: 2,
    themes: ["Manga", "Anime", "pancarte"]
  },
  {
    name: "Ares",
    src: "./images/Ares_modified.png",
    alt: "Ares",
    favorite: true,
    number: 2,
    themes: ["Astrologie"]
  },
  {
    name: "Death Note",
    src: "./images/Death_modified.png",
    alt: "Death Note",
    favorite: true,
    number: 2,
    themes: ["Manga", "Anime", "pancarte"]
  },
  {
    name: "Dragon Aquatique",
    src: "./images/dragon_originale.jpeg",
    alt: "Dragon Aquatique",
    favorite: true,
    number: 2,
    themes: ["Dragon", "Fantastique"]
  },
  {
    name: "Fairy Tail",
    src: "./images/fairy_modified.png",
    alt: "Fairy Tail",
    favorite: true,
    number: 2,
    themes: ["Manga", "Anime", "pancarte"]
  },
  {
    name: "Femme Juculaire",
    src: "./images/femme_modified.png",
    alt: "Femme Juculaire",
    favorite: false,
    number: 1,
    sensible: true,
    themes: ["Femme", "Suicide"]
  },
  {
    name: "Hunter X Hunter",
    src: "./images/hunter_modified.png",
    alt: "Hunter X Hunter",
    favorite: true,
    number: 2,
    themes: ["Manga", "Anime", "pancarte"]
  },
  {
    name: "Yuri on Ice",
    src: "./images/ice_modified.png",
    alt: "Yuri on ice",
    favorite: true,
    number: 2,
    themes: ["Manga", "Anime", "pancarte"]
  },
  {
    name: "Le Roi Lion",
    src: "./images/KingLion_originale.jpg",
    alt: "Le Roi Lion",
    favorite: true,
    number: 2,
    themes: ["Film", "Disney"]
  },
  {
    name: "Loup Tatoo",
    src: "./images/loup_originale.jpeg",
    alt: "Loup Tatoo",
    favorite: true,
    number: 2,
    themes: ["Simple", "Tatoo"]
  },
  {
    name: "phenix",
    src: "./images/phenix_modified.png",
    alt: "phenix",
    favorite: true,
    number: 2,
    themes: ["Fantastique"]
  },
  {
    name: "L'attaque des titans",
    src: "./images/SNK_modified.png",
    alt: "L'attaque des titans",
    favorite: true,
    number: 2,
    themes: ["Manga", "Anime", "pancarte"]
  }
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: cn(
        "ygroup yflex yoverflow-hidden yp-2 [--duration:y40s] [--gap:y1rem] [gap:yvar(--gap)] sm:yw-1/4 yw-1/3",
        {
          "yflex-row": !vertical,
          "yflex-col": vertical
        },
        className
      ),
      children: Array(repeat).fill(0).map((_, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: cn("yflex yshrink-0 yjustify-around [gap:yvar(--gap)]", {
            "yanimate-marquee yflex-row": !vertical,
            "yanimate-marquee-vertical yflex-col": vertical,
            "ygroup-hover:[yanimation-play-state:ypaused]": pauseOnHover,
            "[yanimation-direction:yreverse]": reverse
          }),
          children
        },
        i
      ))
    }
  );
}
const expandedImages = images.flatMap(
  (image) => image.favorite ? Array.from({ length: image.number }, (_, index) => ({
    ...image,
    key: `${image.name}-${index}`
  })) : []
);
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const shuffledImages = shuffleArray([...expandedImages]);
const quarterLength = Math.ceil(shuffledImages.length / 4);
const firstRow = shuffledImages.slice(0, quarterLength);
const secondRow = shuffledImages.slice(quarterLength, quarterLength * 2);
const thirdRow = shuffledImages.slice(quarterLength * 2, quarterLength * 3);
const fourthRow = shuffledImages.slice(quarterLength * 3);
const ReviewCard = ({
  src,
  alt
}) => {
  return /* @__PURE__ */ jsx(
    "figure",
    {
      className: cn(
        "yrelative yh-auto yw-full ycursor-pointer yoverflow-hidden yrounded-xl yborder ymy-2",
        // light styles
        "yborder-gray-950/[.1] ybg-gray-950/[.01] hover:ybg-gray-950/[.05]",
        // dark styles
        "dark:yborder-gray-50/[.1] dark:ybg-gray-50/[.10] dark:yhover:bg-gray-50/[.15]"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "yflex yflex-row yitems-center yw-full yh-full", children: /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt,
          className: "yw-full yh-full",
          draggable: "false",
          onContextMenu: (e) => e.preventDefault()
        }
      ) })
    }
  );
};
function MarqueeDemoVertical() {
  return /* @__PURE__ */ jsxs("div", { className: "yrelative yflex yh-[500px] yw-full yflex-row yitems-center yjustify-center yoverflow-hidden yrounded-lg yborder ybg-background md:yshadow-xl", children: [
    /* @__PURE__ */ jsx(Marquee, { pauseOnHover: true, vertical: true, className: "[--duration:20s]", children: firstRow.map((expandedImage) => /* @__PURE__ */ jsx(ReviewCard, { ...expandedImage }, expandedImage.key)) }),
    /* @__PURE__ */ jsx(Marquee, { reverse: true, pauseOnHover: true, vertical: true, className: "[--duration:20s]", children: secondRow.map((expandedImage) => /* @__PURE__ */ jsx(ReviewCard, { ...expandedImage }, expandedImage.key)) }),
    /* @__PURE__ */ jsx(Marquee, { pauseOnHover: true, vertical: true, className: "[--duration:20s]", children: thirdRow.map((expandedImage) => /* @__PURE__ */ jsx(ReviewCard, { ...expandedImage }, expandedImage.key)) }),
    /* @__PURE__ */ jsx(
      Marquee,
      {
        pauseOnHover: true,
        vertical: true,
        reverse: true,
        className: "[--duration:20s] sm:yblock yhidden",
        children: fourthRow.map((expandedImage) => /* @__PURE__ */ jsx(ReviewCard, { ...expandedImage }, expandedImage.key))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "ypointer-events-none yabsolute yinset-x-0 ytop-0 yh-1/3 ybg-gradient-to-b yfrom-white dark:yfrom-background" }),
    /* @__PURE__ */ jsx("div", { className: "ypointer-events-none yabsolute yinset-x-0 ybottom-0 yh-1/3 ybg-gradient-to-t yfrom-white dark:yfrom-background" })
  ] });
}
const Pannel = () => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(MarqueeDemoVertical, {}) });
};
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx("div", { className: "yfont-sans", children: /* @__PURE__ */ jsx(Pannel, {}) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B27cFY-7.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Bgp6CEn-.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Bf4I2Mau.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Bgp6CEn-.js"], "css": ["/assets/root-synyAV3n.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DAAfjQ93.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-d2e0a67e.js", "version": "d2e0a67e" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
