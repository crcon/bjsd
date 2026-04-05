(function () {
  const slides = [
    { title: "封面", url: "slides/01-cover/page.html" },
    { title: "目录", url: "slides/02-toc/page.html" },
    { title: "管理层摘要", url: "slides/02-summary/page.html" },
    { title: "市场规模与结构", url: "slides/03-scale/page.html" },
    { title: "政策框架", url: "slides/04-policy/page.html" },
    { title: "市场成效", url: "slides/05-impact/page.html" },
    { title: "市场建设", url: "slides/06-construction/page.html" },
    { title: "绿色市场", url: "slides/07-green/page.html" },
    { title: "运营与平台", url: "slides/08-operations/page.html" },
    { title: "交易机构规范运作", url: "slides/09-governance/page.html" },
    { title: "交易平台与标准建设", url: "slides/10-platform/page.html" },
    { title: "电力市场服务", url: "slides/11-service/page.html" },
    { title: "党建引领", url: "slides/12-party/page.html" },
    { title: "结论页", url: "slides/13-closing/page.html" },
    { title: "封底", url: "slides/15-backcover/page.html" }
  ];

  const params = new URLSearchParams(window.location.search);

  function getPrintUrl(autoPrint) {
    const printParams = new URLSearchParams();
    printParams.set("print", "1");
    if (autoPrint) {
      printParams.set("autoprint", "1");
    }
    return window.location.pathname + "?" + printParams.toString();
  }

  function initDeck() {
    const frame = document.getElementById("slide-frame");
    const counter = document.getElementById("slide-counter");
    const name = document.getElementById("slide-name");
    const state = { index: 0 };

    function sync() {
      const current = slides[state.index];
      frame.src = current.url;
      counter.textContent = String(state.index + 1) + " / " + String(slides.length);
      name.textContent = current.title;
    }

    function go(step) {
      const nextIndex = Math.max(0, Math.min(slides.length - 1, state.index + step));
      if (nextIndex !== state.index) {
        state.index = nextIndex;
        sync();
      }
    }

    function jump(index) {
      if (index >= 0 && index < slides.length && index !== state.index) {
        state.index = index;
        sync();
      }
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function () {});
      } else {
        document.exitFullscreen().catch(function () {});
      }
    }

    document.querySelector('[data-action="prev"]').addEventListener("click", function () {
      go(-1);
    });
    document.querySelector('[data-action="next"]').addEventListener("click", function () {
      go(1);
    });
    document.querySelector('[data-action="print"]').addEventListener("click", function () {
      window.open(getPrintUrl(true), "_blank", "noopener,noreferrer");
    });
    document.querySelector('[data-action="fullscreen"]').addEventListener("click", toggleFullscreen);

    window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented) {
        return;
      }
      const activeTag = document.activeElement ? document.activeElement.tagName : "";
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") {
        return;
      }
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        jump(0);
      } else if (event.key === "End") {
        event.preventDefault();
        jump(slides.length - 1);
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        toggleFullscreen();
      }
    });

    sync();
  }

  function initCharts(root) {
    root.querySelectorAll(".chart").forEach(function (node) {
      const type = node.getAttribute("data-type");
      const points = parsePoints(node.getAttribute("data-points"));
      if (!points.length) {
        return;
      }
      if (type === "bars") {
        renderBars(node, points);
      } else if (type === "hbars") {
        renderHbars(node, points);
      }
    });
  }

  async function initPrintDeck() {
    const printShell = document.getElementById("print-shell");
    document.body.classList.add("is-print-mode");

    const parser = new DOMParser();

    for (let index = 0; index < slides.length; index += 1) {
      const response = await fetch(slides[index].url);
      const html = await response.text();
      const parsed = parser.parseFromString(html, "text/html");
      const slide = parsed.querySelector(".slide");
      if (!slide) {
        continue;
      }
      const wrapper = document.createElement("article");
      wrapper.className = "print-page";
      wrapper.setAttribute("data-print-index", String(index + 1));
      wrapper.setAttribute("data-print-title", slides[index].title);
      wrapper.appendChild(document.importNode(slide, true));
      const footer = document.createElement("div");
      footer.className = "print-footer";
      footer.innerHTML = [
        '<span class="print-footer-title">北京电力交易中心 2025年电力市场年报</span>',
        '<span class="print-footer-page">' + String(index + 1) + ' / ' + String(slides.length) + '</span>'
      ].join("");
      wrapper.appendChild(footer);
      printShell.appendChild(wrapper);
    }

    initCharts(printShell);
    document.body.classList.add("is-visible");

    if (params.get("autoprint") === "1") {
      window.setTimeout(function () {
        window.print();
      }, 400);
    }
  }

  function parsePoints(input) {
    return (input || "")
      .split(";")
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean)
      .map(function (item) {
        const parts = item.split(":");
        const label = parts.slice(0, -1).join(":").trim();
        const value = Number(parts[parts.length - 1]);
        return { label: label, value: value };
      })
      .filter(function (item) {
        return !Number.isNaN(item.value);
      });
  }

  function renderBars(node, points) {
    const max = Math.max.apply(
      null,
      points.map(function (item) {
        return item.value;
      })
    );
    node.classList.add("chart-bars");
    node.style.setProperty("--cols", String(points.length));
    node.innerHTML = points
      .map(function (item) {
        const height = max > 0 ? Math.max(8, (item.value / max) * 100) : 0;
        return [
          '<div class="chart-bar">',
          '  <div class="chart-bar-shape" style="height: ' + height.toFixed(2) + '%;">',
          '    <div class="chart-bar-value">' + item.value + '</div>',
          "  </div>",
          '  <div class="chart-bar-label">' + item.label + "</div>",
          "</div>"
        ].join("");
      })
      .join("");
  }

  function renderHbars(node, points) {
    const max = Math.max.apply(
      null,
      points.map(function (item) {
        return item.value;
      })
    );
    node.classList.add("chart-hbars");
    node.innerHTML = points
      .map(function (item) {
        const width = max > 0 ? (item.value / max) * 100 : 0;
        return [
          '<div class="chart-hbar-row">',
          '  <div class="chart-hbar-label">' + item.label + "</div>",
          '  <div class="chart-hbar-track"><div class="chart-hbar-fill" style="width: ' + width.toFixed(2) + '%;"></div></div>',
          '  <div class="chart-hbar-value">' + item.value + "</div>",
          "</div>"
        ].join("");
      })
      .join("");
  }

  function initSlide() {
    document.body.classList.remove("is-visible");
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        document.body.classList.add("is-visible");
      });
    });

    initCharts(document);
  }

  if (document.body && document.body.dataset.app === "deck") {
    if (params.get("print") === "1") {
      initPrintDeck();
    } else {
      initDeck();
    }
  }

  if (document.body && document.body.dataset.app === "slide") {
    initSlide();
  }
})();