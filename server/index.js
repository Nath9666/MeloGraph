import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMotionValue, useSpring, useInView } from "framer-motion";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
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
      /* @__PURE__ */ jsx("a", { href: "/about", className: "yw-1/12 yhidden sm:yblock special-text", children: "A propos" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "ytext-black hover:ytext-blue-200 yflex yitems-center yjustify-center",
          children: /* @__PURE__ */ jsx("img", { src: "./logo.png", alt: "Logo", className: "sm:yw-1/6 yw-1/4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { onClick: toggleMenu, className: "ycursor-pointer", children: isMenuOpen ? /* @__PURE__ */ jsx(XMarkIcon, { className: "yh-6 yw-6 ytext-black" }) : /* @__PURE__ */ jsx(Bars3Icon, { className: "yh-6 yw-6 ytext-black" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "yabsolute ybottom-0 yleft-0 yw-full yh-1 ybg-gradient-to-r yfrom-blue-900 yvia-blue-500 yto-transparent" }),
    isMenuOpen && /* @__PURE__ */ jsxs("div", { className: "yabsolute ytop-full yleft-0 yw-full ybg-white yshadow-md ybg-opacity-80 special-text", children: [
      /* @__PURE__ */ jsxs("ul", { className: "yflex yjustify-around", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/rendez-vous", className: "yblock ypx-4 ypy-2 ytext-black", children: "prendre rendez vous" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/contacts", className: "yblock ypx-4 ypy-2 ytext-black", children: "contacts" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/commandes", className: "yblock ypx-4 ypy-2 ytext-black", children: "ma commande" }) }),
        /* @__PURE__ */ jsx("li", { className: "sm:yhidden yblock", children: /* @__PURE__ */ jsx("a", { href: "/about", className: "yblock ypx-4 ypy-2 ytext-black", children: "A propos" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "yabsolute ybottom-0 yleft-0 yw-full yh-1 ybg-gradient-to-l yfrom-blue-900 yvia-blue-500 yto-transparent" })
    ] })
  ] });
};
function BrandicoFacebookRect(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 1000 1000",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M182.594 0C81.445 0 0 81.445 0 182.594v634.813c0 101.149 81.445 182.594 182.594 182.594h344.063V609.063H423.282v-140.75h103.375v-120.25c0-94.475 61.079-181.219 201.781-181.219c56.968 0 99.094 5.469 99.094 5.469l-3.313 131.438s-42.963-.406-89.844-.406c-50.739 0-58.875 23.378-58.875 62.188v102.781h152.75l-6.656 140.75H675.5v390.938h141.906c101.149 0 182.594-81.445 182.594-182.594V182.595C1000 81.446 918.555.001 817.406.001H182.593z"
        }
      )
    }
  );
}
function LogosInstagram(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "4.21em",
      height: "1.2em",
      viewBox: "0 0 512 146",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M27.127.902C16.68 5.278 5.197 17.625 1.57 33.135C-3.024 52.78 16.09 61.09 17.659 58.369c1.845-3.201-3.425-4.283-4.51-14.477c-1.402-13.166 4.719-27.877 12.423-34.332c1.43-1.2 1.363.47 1.363 3.557c0 5.521-.305 55.085-.305 65.429c0 13.996-.578 18.416-1.617 22.784c-1.051 4.425-2.743 7.416-1.462 8.568c1.432 1.288 7.546-1.777 11.085-6.716c4.244-5.924 5.73-13.04 5.997-20.765c.322-9.314.308-24.094.322-32.524c.012-7.731.13-30.37-.136-43.98c-.065-3.34-9.323-6.842-13.692-5.011M398.07 66.405c-.337 7.277-1.948 12.964-3.947 16.976c-3.87 7.767-11.9 10.178-15.31-.986c-1.858-6.086-1.945-16.25-.61-24.743c1.36-8.651 5.158-15.185 11.445-14.596c6.202.583 9.105 8.574 8.422 23.35m-104.55 45.146c-.084 12.09-1.987 22.69-6.067 25.77c-5.788 4.366-13.567 1.09-11.956-7.732c1.425-7.807 8.166-15.78 18.04-25.522c0 0 .02 2.222-.017 7.484m-1.58-45.217c-.354 6.628-2.072 13.285-3.947 17.047c-3.87 7.767-11.958 10.195-15.31-.986c-2.292-7.64-1.743-17.526-.61-23.756c1.472-8.083 5.04-15.582 11.445-15.582c6.228 0 9.3 6.833 8.422 23.277m-60.565-.1c-.38 7.018-1.749 12.885-3.946 17.147c-3.976 7.714-11.842 10.16-15.31-.986c-2.501-8.037-1.65-18.995-.61-24.915c1.544-8.785 5.41-15.013 11.445-14.423c6.199.606 9.212 8.573 8.421 23.177m277.553 8.198c-1.515 0-2.207 1.562-2.78 4.19c-1.983 9.144-4.07 11.207-6.759 11.207c-3.005 0-5.705-4.526-6.4-13.588c-.545-7.126-.457-20.244.24-33.293c.143-2.681-.597-5.334-7.788-7.946c-3.094-1.124-7.592-2.779-9.832 2.627c-6.327 15.274-8.803 27.4-9.386 32.324c-.03.255-.343.308-.397-.288c-.372-3.945-1.201-11.115-1.305-26.177c-.02-2.939-.642-5.44-3.886-7.488c-2.105-1.33-8.496-3.68-10.797-.883c-1.994 2.286-4.304 8.44-6.703 15.736c-1.95 5.93-3.308 9.94-3.308 9.94s.026-15.998.049-22.067c.01-2.289-1.56-3.052-2.034-3.19c-2.13-.618-6.33-1.651-8.112-1.651c-2.2 0-2.738 1.228-2.738 3.02c0 .235-.347 21.063-.347 35.627c0 .633 0 1.323.003 2.057c-1.216 6.694-5.161 15.78-9.451 15.78c-4.296 0-6.322-3.798-6.322-21.161c0-10.129.304-14.534.453-21.86c.087-4.22.255-7.46.245-8.195c-.032-2.255-3.93-3.392-5.745-3.812c-1.823-.423-3.407-.588-4.644-.517c-1.751.1-2.99 1.247-2.99 2.827c0 .848.01 2.458.01 2.458c-2.255-3.544-5.882-6.01-8.295-6.725c-6.5-1.93-13.282-.22-18.398 6.939c-4.066 5.687-6.517 12.13-7.482 21.385c-.705 6.767-.475 13.628.779 19.431c-1.515 6.548-4.326 9.23-7.405 9.23c-4.47 0-7.71-7.294-7.334-19.912c.248-8.299 1.909-14.123 3.724-22.549c.774-3.592.145-5.472-1.432-7.274c-1.447-1.653-4.53-2.498-8.96-1.46c-3.156.741-7.669 1.538-11.798 2.15c0 0 .25-.995.454-2.747c1.074-9.19-8.913-8.445-12.1-5.51c-1.901 1.753-3.196 3.82-3.687 7.536c-.78 5.898 4.03 8.68 4.03 8.68c-1.577 7.224-5.446 16.66-9.44 23.483c-2.139 3.655-3.775 6.364-5.888 9.243a1388 1388 0 0 1 .226-34.66c.087-4.22.256-7.374.247-8.11c-.024-1.648-.987-2.272-2.99-3.06c-1.772-.698-3.866-1.18-6.039-1.35c-2.742-.212-4.394 1.241-4.35 2.961c.008.325.008 2.319.008 2.319c-2.255-3.544-5.882-6.01-8.295-6.725c-6.5-1.93-13.282-.22-18.398 6.939c-4.065 5.687-6.727 13.669-7.482 21.315c-.702 7.125-.573 13.18.385 18.282c-1.033 5.108-4.005 10.45-7.364 10.45c-4.296 0-6.74-3.799-6.74-21.162c0-10.129.304-14.534.454-21.86c.087-4.219.254-7.46.245-8.195c-.032-2.255-3.931-3.391-5.746-3.812c-1.898-.44-3.537-.6-4.796-.507c-1.66.123-2.828 1.61-2.828 2.719v2.556c-2.255-3.544-5.882-6.01-8.295-6.725c-6.5-1.93-13.244-.192-18.398 6.939c-3.36 4.649-6.081 9.803-7.481 21.213c-.405 3.297-.584 6.386-.56 9.271c-1.34 8.196-7.26 17.642-12.101 17.642c-2.833 0-5.532-5.496-5.532-17.207c0-15.6.966-37.812 1.13-39.952c0 0 6.117-.104 7.301-.118c3.052-.034 5.815.039 9.88-.17c2.038-.103 4.002-7.42 1.898-8.325c-.954-.41-7.693-.768-10.365-.825c-2.246-.05-8.5-.514-8.5-.514s.561-14.743.692-16.3c.11-1.299-1.57-1.967-2.532-2.372c-2.342-.99-4.437-1.465-6.92-1.977c-3.432-.708-4.988-.015-5.292 2.88c-.458 4.395-.695 17.268-.695 17.268c-2.518 0-11.12-.492-13.638-.492c-2.34 0-4.866 10.064-1.63 10.188c3.722.144 10.209.27 14.509.398c0 0-.192 22.578-.192 29.55q.001 1.11.008 2.148c-2.367 12.335-10.703 18.999-10.703 18.999c1.79-8.161-1.867-14.29-8.454-19.478c-2.427-1.911-7.218-5.53-12.578-9.496c0 0 3.104-3.06 5.858-9.216c1.95-4.362 2.035-9.351-2.754-10.452c-7.912-1.82-14.435 3.991-16.381 10.195c-1.508 4.806-.704 8.371 2.25 12.075c.215.271.45.548.69.826c-1.785 3.442-4.239 8.077-6.317 11.671c-5.768 9.98-10.125 17.872-13.418 17.872c-2.632 0-2.597-8.014-2.597-15.517c0-6.468.478-16.193.86-26.26c.126-3.33-1.54-5.227-4.33-6.945c-1.696-1.044-5.315-3.096-7.411-3.096c-3.138 0-12.19.427-20.742 25.167c-1.078 3.118-3.196 8.8-3.196 8.8l.183-29.751c0-.698-.372-1.372-1.223-1.833c-1.441-.783-5.29-2.383-8.713-2.383q-2.445.001-2.445 2.27l-.298 46.546c0 3.537.092 7.663.442 9.467c.348 1.806.913 3.276 1.611 4.15c.699.873 1.506 1.54 2.837 1.814c1.239.255 8.023 1.126 8.376-1.466c.422-3.108.439-6.468 4.001-19.002C75.89 58.072 83.12 48.552 86.52 45.17c.595-.59 1.273-.626 1.24.341c-.144 4.278-.655 14.97-.998 24.05c-.921 24.305 3.5 28.81 9.819 28.81c4.834 0 11.648-4.803 18.952-16.961a4281 4281 0 0 0 12.153-20.36c2.213 2.049 4.698 4.254 7.18 6.61c5.77 5.476 7.664 10.68 6.407 15.616c-.96 3.773-4.581 7.662-11.024 3.883c-1.878-1.103-2.68-1.956-4.568-3.199c-1.014-.667-2.563-.867-3.492-.167c-2.412 1.818-3.792 4.132-4.58 6.996c-.766 2.787 2.025 4.26 4.919 5.549c2.491 1.109 7.846 2.114 11.26 2.228c13.305.445 23.964-6.424 31.384-24.143c1.328 15.303 6.98 23.962 16.801 23.962c6.566 0 13.149-8.487 16.028-16.836c.826 3.403 2.05 6.363 3.63 8.866c7.567 11.99 22.247 9.41 29.621-.772c2.28-3.146 2.627-4.276 2.627-4.276c1.076 9.613 8.818 12.972 13.25 12.972c4.965 0 10.09-2.347 13.683-10.435q.63 1.319 1.383 2.511c7.567 11.99 22.248 9.41 29.622-.772q.52-.716.913-1.3l.216 6.315l-6.789 6.227c-11.38 10.43-20.024 18.34-20.66 27.553c-.81 11.747 8.712 16.113 15.926 16.685c7.647.607 14.208-3.621 18.234-9.538c3.544-5.209 5.864-16.419 5.693-27.49c-.067-4.434-.18-10.071-.267-16.114c3.995-4.639 8.496-10.503 12.64-17.365c4.516-7.479 9.356-17.523 11.834-25.34c0 0 4.205.037 8.693-.257c1.435-.094 1.848.2 1.582 1.251c-.32 1.272-5.67 21.905-.787 35.65c3.341 9.41 10.874 12.436 15.34 12.436c5.229 0 10.23-3.948 12.91-9.81c.324.653.661 1.285 1.03 1.87c7.567 11.99 22.196 9.393 29.622-.773c1.676-2.294 2.627-4.276 2.627-4.276c1.593 9.95 9.331 13.023 13.763 13.023c4.616 0 8.998-1.893 12.552-10.304c.15 3.704.383 6.732.752 7.686c.225.585 1.537 1.317 2.491 1.671c4.224 1.566 8.53.826 10.124.504c1.104-.224 1.965-1.11 2.083-3.396c.31-6.005.12-16.094 1.94-23.593c3.055-12.583 5.906-17.464 7.258-19.88c.757-1.355 1.61-1.578 1.641-.145c.064 2.9.208 11.413 1.392 22.853c.87 8.412 2.03 13.385 2.923 14.96c2.548 4.5 5.693 4.713 8.255 4.713c1.63 0 5.038-.45 4.733-3.314c-.149-1.396.111-10.024 3.124-22.421c1.967-8.096 5.247-15.41 6.43-18.085c.437-.986.64-.209.632-.057c-.249 5.575-.808 23.811 1.463 33.785c3.08 13.511 11.986 15.023 15.09 15.023c6.626 0 12.045-5.04 13.87-18.302c.44-3.192-.211-5.656-2.162-5.656"
        }
      )
    }
  );
}
function BrandicoLinkedinRect(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 1000 1000",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M196.064.25C88.347.25.187 88.408.187 196.127v607.841c0 107.717 88.158 195.845 195.877 195.845h607.841c107.718 0 195.845-88.127 195.845-195.845V196.127C999.75 88.41 911.623.25 803.905.25zm49.266 164.948c51.648 0 83.461 33.906 84.443 78.475c0 43.585-32.797 78.444-85.442 78.444h-.969c-50.665 0-83.412-34.857-83.412-78.444c0-44.568 33.738-78.475 85.379-78.475zm445.08 208.31c99.329 0 173.79 64.922 173.79 204.436v260.449H713.247V595.406c0-61.06-21.847-102.718-76.476-102.718c-41.704 0-66.562 28.078-77.476 55.202c-3.987 9.704-4.967 23.257-4.967 36.832v253.671H403.375s1.981-411.613 0-454.233h150.984v64.324c20.06-30.95 55.942-74.977 136.051-74.977zm-521.556 10.685h150.953v454.202H168.854z"
        }
      )
    }
  );
}
function BrandicoTwitterBird(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1.24em",
      height: "1em",
      viewBox: "0 0 1231.051 1000",
      ...props,
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          d: "M1231.051 118.453q-51.422 76.487-126.173 130.403q.738 14.46.738 32.687q0 101.273-29.53 202.791q-29.53 101.519-90.215 194.343T841.297 843.145T639.62 957.395t-252.474 42.606q-210.2 0-387.147-113.493q31.406 3.495 60.242 3.495q175.605 0 313.687-108.177q-81.877-1.501-146.654-50.409q-64.777-48.907-89.156-124.988q24.097 4.59 47.566 4.59q33.782 0 66.482-8.812q-87.378-17.5-144.975-87.04q-57.595-69.539-57.595-160.523v-3.126q53.633 29.696 114.416 31.592q-51.762-34.508-82.079-89.999q-30.319-55.491-30.319-120.102q0-68.143 34.151-126.908q95.022 116.607 230.278 186.392q135.258 69.786 290.212 77.514q-6.609-27.543-6.621-57.485q0-104.546 73.994-178.534Q747.623 0 852.169 0q109.456 0 184.392 79.711q85.618-16.959 160.333-61.349q-28.785 90.59-110.933 139.768q75.502-8.972 145.088-39.677z"
        }
      )
    }
  );
}
const Footer = () => {
  const Year = (/* @__PURE__ */ new Date()).getFullYear();
  const info = [
    {
      visible: true,
      icon: BrandicoFacebookRect,
      link: "https://www.facebook.com/example"
    },
    {
      visible: true,
      icon: LogosInstagram,
      link: "https://www.instagram.com/example"
    },
    {
      visible: true,
      icon: BrandicoLinkedinRect,
      link: "https://www.linkedin.com/company/example"
    },
    {
      visible: true,
      icon: BrandicoTwitterBird,
      link: "https://twitter.com/example"
    }
  ];
  return /* @__PURE__ */ jsxs("footer", { className: "yflex yflex-col ybg-white ypy-4 yjustify-center yitems-center yz-50", children: [
    /* @__PURE__ */ jsx("div", { className: "ycontainer ymx-auto yflex yjustify-center yitems-center", children: /* @__PURE__ */ jsx("div", { className: "yflex yspace-x-4", children: info.map((item, index) => {
      const Icon = item.icon;
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: item.link,
          target: "_blank",
          rel: "noreferrer",
          className: "hover:ybg-blue-500 yp-2 hover:ytext-white yrounded-full",
          children: /* @__PURE__ */ jsx(Icon, { className: "yh-6 yw-auto" })
        },
        index
      );
    }) }) }),
    /* @__PURE__ */ jsx("img", { src: "./logo.png", alt: "Logo", className: "sm:yw-1/4 yw-1/3" }),
    /* @__PURE__ */ jsxs("span", { children: [
      "2023-",
      Year
    ] })
  ] });
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "fr", children: [
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
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(Footer, {})
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
const Meteors = ({ number = 20 }) => {
  const [meteorStyles, setMeteorStyles] = useState(
    []
  );
  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s"
    }));
    setMeteorStyles(styles);
  }, [number]);
  return /* @__PURE__ */ jsx(Fragment, { children: [...meteorStyles].map((style, idx) => (
    // Meteor Head
    /* @__PURE__ */ jsx(
      "span",
      {
        className: cn(
          "ypointer-events-none yabsolute yleft-1/2 ytop-1/2 ysize-0.5 yrotate-[215deg] yanimate-meteor yrounded-full ybg-slate-500 yshadow-[0_0_0_1px_#ffffff10]"
        ),
        style,
        children: /* @__PURE__ */ jsx("div", { className: "ypointer-events-none yabsolute ytop-1/2 y-z-10 yh-px yw-[50px] y-translate-y-1/2 ybg-gradient-to-r yfrom-slate-500 yto-transparent" })
      },
      idx
    )
  )) });
};
function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });
  useEffect(() => {
    isInView && setTimeout(() => {
      motionValue.set(direction === "down" ? 0 : value);
    }, delay * 1e3);
  }, [motionValue, isInView, delay, value, direction]);
  useEffect(
    () => springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          latest.toFixed(0)
        );
      }
    }),
    [springValue]
  );
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "yinline-block ytabular-nums ytext-black dark:ytext-white ytracking-wider",
        className
      ),
      ref
    }
  );
}
const Separator = () => {
  const Year = (/* @__PURE__ */ new Date()).getFullYear();
  const NumberCommades = 100;
  const info = [
    {
      number: NumberCommades,
      alt: "Commandes réalisées"
    },
    {
      number: 20,
      alt: "Clients m'ont fait confiance"
    },
    {
      number: Year - 2010,
      alt: "Années d'expériences"
    },
    {
      number: NumberCommades + images.length - 1,
      alt: "Projets réalisés"
    }
  ];
  let MeteorsNumber = 0;
  for (let i = 0; i < info.length; i++) {
    MeteorsNumber += info[i].number;
  }
  MeteorsNumber = Math.floor(MeteorsNumber / 2);
  return /* @__PURE__ */ jsxs("div", { className: "yrelative yflex yh-[500px] yw-full sm:yflex-row yflex-col yitems-center yjustify-center yoverflow-hidden yrounded-lg yborder ybg-background md:yshadow-xl", children: [
    /* @__PURE__ */ jsx(Meteors, { number: MeteorsNumber }),
    info.map((item, index) => {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "yflex yflex-col yitems-center yjustify-center ypx-4 ypy-2",
          children: [
            /* @__PURE__ */ jsx(
              NumberTicker,
              {
                value: item.number,
                className: "ytext-2xl yfont-bold ytext-black"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "sm:ytext-2xl ytext-lg ytext-black yjustify-center special-text", children: item.alt })
          ]
        },
        index
      );
    })
  ] });
};
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "yrelative yh-1 yw-full yoverflow-hidden yrounded-full ybg-orange-200",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "yh-full yw-full yflex-1 ybg-blue-500 ytransition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const buttonVariants = cva(
  "yinline-flex yitems-center yjustify-center ywhitespace-nowrap yrounded-md ytext-sm yfont-medium yring-offset-background ytransition-colors focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ypointer-events-none disabled:yopacity-50",
  {
    variants: {
      variant: {
        default: "ybg-primary ytext-primary-foreground hover:ybg-primary/90",
        destructive: "ybg-destructive ytext-destructive-foreground hover:ybg-destructive/90",
        outline: "yborder yborder-input ybg-background hover:ybg-accent hover:ybg-destructive/90",
        secondary: "ybg-secondary ytext-secondary-foreground hover:ybg-secondary/80",
        ghost: "hover:ybg-accent hover:ytext-accent-foreground",
        link: "ytext-primary yunderline-offset-4 hover:yunderline"
      },
      size: {
        default: "yh-10 ypx-4 ypy-2",
        sm: "yh-9 yrounded-md ypx-3",
        lg: "yh-11 yrounded-md ypx-8",
        icon: "yh-10 yw-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("yrelative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "yoverflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "yflex",
        orientation === "horizontal" ? "y-ml-4" : "y-mt-4 yflex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "ymin-w-0 yshrink-0 ygrow-0 ybasis-full yjustify-center yflex yitems-center",
        orientation === "horizontal" ? "ypl-4" : "ypt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "yabsolute y yh-8 yw-8 yrounded-full yborder-none",
        orientation === "horizontal" ? "y-left-12 ytop-1/2 y-translate-y-1/2" : "y-top-12 yleft-1/2 y-translate-x-1/2 yrotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "yh-4 yw-4" }),
        /* @__PURE__ */ jsx("span", { className: "ysr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "yabsolute yh-full yw-8 yrounded-full yborder-none",
        orientation === "horizontal" ? "y-right-12 ytop-1/2 y-translate-y-1/2" : "y-bottom-12 yleft-1/2 y-translate-x-1/2 yrotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "yh-4 yw-4" }),
        /* @__PURE__ */ jsx("span", { className: "ysr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
const Theme = ({
  text,
  isTextOnRight,
  imageUrl,
  description
}) => {
  const ListImages = [];
  images.map(
    (image) => image.themes.map(
      (theme) => theme === text ? ListImages.push(image) : null
    )
  );
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  useEffect(() => {
    const interval = setInterval(async () => {
      setProgress((prev) => {
        if (prev > 100) {
          return 0;
        }
        return prev + 1;
      });
      if (progress > 100) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        setActiveIndex((prevIndex) => (prevIndex + 1) % ListImages.length);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [ListImages.length, progress]);
  useEffect(() => {
    if (api) {
      api.scrollTo(activeIndex);
    }
  }, [activeIndex, api]);
  const handlePreviousClick = async () => {
    setProgress(0);
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + ListImages.length) % ListImages.length
    );
  };
  const handleNextClick = async () => {
    setProgress(0);
    setActiveIndex((prevIndex) => (prevIndex + 1) % ListImages.length);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `yflex ${isTextOnRight ? "yflex-row-reverse" : "yflex-row"} yitems-center bg-gradient-custom`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "yflex yflex-col yw-1/2 yp-4 ytext-white ygap-y-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "special-text ytext-2xl", children: text }),
          /* @__PURE__ */ jsx("p", { children: description }),
          /* @__PURE__ */ jsx("div", { className: "yflex yflex-row", children: ListImages.map((image, index) => /* @__PURE__ */ jsx("div", { className: "yflex-1", id: index.toString(), children: /* @__PURE__ */ jsx(Progress, { value: index === activeIndex ? progress : 0 }) }, index)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "yw-1/2 yp-4", children: /* @__PURE__ */ jsxs(
          Carousel,
          {
            opts: {
              align: "start",
              loop: true
            },
            setApi,
            children: [
              /* @__PURE__ */ jsx(CarouselContent, { children: ListImages.map((image) => /* @__PURE__ */ jsx(CarouselItem, { children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: image.src,
                  alt: image.name,
                  className: "yw-full yh-auto yrounded-xl"
                }
              ) }, image.id)) }),
              /* @__PURE__ */ jsx(
                CarouselPrevious,
                {
                  className: "yabsolute ytop-1/2 yleft-0 yh-full yz-10 ycursor-pointer ytext-2xl ytext-cyan-100",
                  onClick: handlePreviousClick,
                  children: "<"
                }
              ),
              /* @__PURE__ */ jsx(
                CarouselNext,
                {
                  className: "yabsolute ytop-1/2 yright-0 ytransform yz-10 ycursor-pointer ytext-2xl ytext-cyan-100",
                  onClick: handleNextClick,
                  children: ">"
                }
              )
            ]
          }
        ) })
      ]
    }
  );
};
const meta = () => {
  return [
    { title: "Melo Graph" },
    { name: "description", content: "portfolio de MeloGraph" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    /* @__PURE__ */ jsx(Pannel, {}),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsx(
      Theme,
      {
        text: "Anime",
        description: "Ce thème regroupe les images de dessins animés japonais. Cela peut être des images de manga, d'anime ou de pancarte. Elle regroupe des images de Hunter X Hunter, Yuri on Ice et L'attaque des titans ainsi que d'autres oeuvres issues de la pop culture japonaise.",
        isTextOnRight: true,
        imageUrl: "./images/template.jpeg"
      }
    ),
    /* @__PURE__ */ jsx(
      Theme,
      {
        text: "Fantastique",
        description: "Ce thème regroupe les images de dessins animés japonais. Cela peut être des images de manga, d'anime ou de pancarte. Elle regroupe des images de Hunter X Hunter, Yuri on Ice et L'attaque des titans ainsi que d'autres oeuvres issues de la pop culture japonaise.",
        isTextOnRight: false,
        imageUrl: "./images/template.jpeg"
      }
    )
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-g5HWnCkR.js", "imports": ["/assets/index-D5DUBlz2.js", "/assets/components-BfeGV-YG.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CLkXK203.js", "imports": ["/assets/index-D5DUBlz2.js", "/assets/components-BfeGV-YG.js"], "css": ["/assets/root-BEuxAIZ8.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DXifM-Ol.js", "imports": ["/assets/index-D5DUBlz2.js"], "css": [] } }, "url": "/assets/manifest-2480526f.js", "version": "2480526f" };
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
