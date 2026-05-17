(function () {
  "use strict";

  var STORAGE_KEY = "dviewer-site-lang";
  var DEFAULT_APP_VERSION = "0.1.0";

  var I18N = {
    zh: {
      nav_aria: "主导航",
      nav_features: "功能",
      nav_advantages: "优势",
      nav_workflow: "使用方式",
      nav_history: "历史版本",
      nav_download: "下载",
      hero_h1: "在本地清晰查看口腔 CBCT 与全景 DICOM",
      hero_lead:
        "<strong>DViewer</strong> 是一款由个人开发者维护的 Windows 桌面端医学影像查看程序。指定包含 DICOM 的文件夹即可<strong>递归扫描</strong>子目录，自动进入全景浏览或 CBCT 多页工作流，在本地流畅阅片。",
      cta_download: "下载 DViewer",
      cta_how: "使用方式",
      hero_version_label: "当前版本",
      features_h2: "核心功能",
      card1_h3: "以文件夹为中心",
      card1_p:
        "支持命令行传入路径，或使用程序<strong>标题栏</strong>中的文件夹图标选择目录；自动递归扫描子文件夹中的 DICOM。",
      card2_h3: "智能进入模式",
      card2_p:
        "扫描到<strong>多个</strong> DICOM 时进入 CBCT 外壳（MPR、CPR、Side、TMJ、Report 等 Tab）；<strong>单个</strong>文件默认走首张全景；若为单文件体数据，启动时可加 <code>--cbct</code> 进入 CBCT。",
      card3_h3: "流畅阅片",
      card3_p: "为二维切片与三维相关视图提供流畅的窗宽窗位与交互基础。",
      advantages_h2: "产品优势",
      adv1_h3: "体积小",
      adv1_p: "安装包仅约 <strong>20 MB</strong>，下载与拷贝都更轻松，也不易占满磁盘。",
      adv2_h3: "更新快",
      adv2_p: "<strong>每周保证至少发布 1 个版本</strong>，问题修复与体验改进能更快送到你手上。",
      adv3_h3: "对电脑要求低",
      adv3_p: "不依赖顶配硬件，在常见办公电脑上也能较流畅地完成日常阅片。",
      workflow_h2: "快速开始",
      step1: "<strong>准备数据</strong> — 将病例 DICOM 放在同一文件夹内（可含子目录）。",
      step2:
        "<strong>启动程序</strong> — 运行 <code>d-viewer.exe</code> 并传入文件夹路径，或使用标题栏「打开文件夹」图标。",
      step3: "<strong>阅片</strong> — 在全景或各 CBCT Tab 中浏览即可。",
      footer_text: "DViewer · 医学影像查看",
      meta_desc: "DViewer — 本地查看口腔 CBCT、全景等 DICOM 医学影像。",
      lang_aria: "界面语言",
      history_title: "DViewer — 历史版本",
      history_h1: "历史版本",
      history_loading: "正在加载版本列表…",
      history_err_load: "无法加载版本列表（请确认已部署 <code>versions.json</code> 且可通过 HTTPS 访问）。",
      history_col_version: "版本",
      history_col_date: "日期",
      history_col_notes: "说明",
      history_col_link: "下载",
      history_link_open: "打开",
    },
    en: {
      nav_aria: "Primary",
      nav_features: "Features",
      nav_advantages: "Highlights",
      nav_workflow: "Get started",
      nav_history: "Release history",
      nav_download: "Download",
      hero_h1: "Local DICOM viewing for dental CBCT and panoramic studies",
      hero_lead:
        "<strong>DViewer</strong> is a Windows desktop DICOM viewer maintained as a personal project. Point it at a folder of DICOM files: it scans recursively, then opens panoramic or CBCT-style workflows for smooth local review.",
      cta_download: "Download DViewer",
      cta_how: "How it works",
      hero_version_label: "Version",
      features_h2: "Features",
      card1_h3: "Folder-first workflow",
      card1_p:
        "Launch with a path on the command line or pick a folder from the <strong>title bar</strong>. Subfolders are scanned automatically.",
      card2_h3: "Smart routing",
      card2_p:
        "Multiple DICOM files open the CBCT shell (MPR, CPR, Side, TMJ, Report). A single file defaults to panoramic; use <code>--cbct</code> for a one-file volume.",
      card3_h3: "Smooth review",
      card3_p: "Responsive window/level and interaction for 2D slices and 3D-style views.",
      advantages_h2: "Why DViewer",
      adv1_h3: "Small footprint",
      adv1_p: "The installer is about <strong>20 MB</strong> — quicker to download and copy, and easier on disk space.",
      adv2_h3: "Frequent updates",
      adv2_p: "<strong>At least one release every week</strong>, so fixes and UX improvements reach you sooner.",
      adv3_h3: "Modest hardware",
      adv3_p: "No top-tier workstation required: day-to-day reading works smoothly on typical office PCs.",
      workflow_h2: "Get started",
      step1: "<strong>Prepare data</strong> — place study DICOMs in one folder (nested folders are fine).",
      step2:
        "<strong>Run DViewer</strong> — execute <code>d-viewer.exe</code> with the folder path, or use the in-app folder icon.",
      step3: "<strong>Review</strong> — browse in panoramic mode or the CBCT tabs as needed.",
      footer_text: "DViewer · Medical imaging",
      meta_desc: "DViewer — local DICOM viewer for dental CBCT and panoramic imaging.",
      lang_aria: "Display language",
      history_title: "DViewer — Release history",
      history_h1: "Release history",
      history_loading: "Loading release list…",
      history_err_load: "Could not load releases (ensure <code>versions.json</code> is deployed and reachable over HTTPS).",
      history_col_version: "Version",
      history_col_date: "Date",
      history_col_notes: "Notes",
      history_col_link: "Download",
      history_link_open: "Open",
    },
  };

  function getLang() {
    var s = localStorage.getItem(STORAGE_KEY);
    if (s === "en" || s === "zh") return s;
    return "zh";
  }

  function applyI18nStrings(lang) {
    var t = I18N[lang];
    if (!t) return;

    var meta = document.querySelector('meta[name="description"]');
    if (meta && t.meta_desc) meta.setAttribute("content", t.meta_desc);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key && t[key] != null) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (key && t[key] != null) el.innerHTML = t[key];
    });

    var nav = document.querySelector(".nav");
    if (nav && t.nav_aria) nav.setAttribute("aria-label", t.nav_aria);

    var langGroup = document.querySelector(".lang-switch");
    if (langGroup && t.lang_aria) langGroup.setAttribute("aria-label", t.lang_aria);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var l = btn.getAttribute("data-set-lang");
      btn.classList.toggle("active", l === lang);
      btn.setAttribute("aria-pressed", l === lang ? "true" : "false");
    });
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "zh") lang = "zh";
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    applyI18nStrings(lang);
  }

  function parseVersionsList(data) {
    var list = Array.isArray(data) ? data : data && data.versions;
    if (!Array.isArray(list)) return [];
    return list.slice().sort(function (a, b) {
      var da = a && a.date ? String(a.date) : "";
      var db = b && b.date ? String(b.date) : "";
      return db.localeCompare(da);
    });
  }

  function pickDisplayVersion(data) {
    if (data && data.current_version != null && String(data.current_version).trim() !== "") {
      return String(data.current_version).trim();
    }
    var sorted = parseVersionsList(data);
    if (sorted.length && sorted[0].version != null) return String(sorted[0].version);
    return null;
  }

  function loadHeroVersion() {
    var el = document.querySelector(".hero-version-num");
    if (!el) return;
    fetch("versions.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        return res.json();
      })
      .then(function (data) {
        var v = pickDisplayVersion(data);
        if (v) el.textContent = v;
        else el.textContent = DEFAULT_APP_VERSION;
      })
      .catch(function () {
        el.textContent = DEFAULT_APP_VERSION;
      });
  }

  function notesForEntry(entry, lang) {
    if (lang === "zh") return entry.notes_zh != null ? entry.notes_zh : entry.notes || "";
    return entry.notes_en != null ? entry.notes_en : entry.notes || "";
  }

  function renderHistoryTable(rows, lang) {
    var t = I18N[lang] || I18N.zh;
    var tbody = document.getElementById("history-tbody");
    var wrap = document.getElementById("history-table-wrap");
    var status = document.getElementById("history-status");
    if (!tbody || !wrap || !status) return;

    tbody.textContent = "";
    rows.forEach(function (entry) {
      var tr = document.createElement("tr");
      var tdV = document.createElement("td");
      tdV.textContent = entry.version != null ? String(entry.version) : "—";
      var tdD = document.createElement("td");
      tdD.textContent = entry.date != null ? String(entry.date) : "—";
      var tdN = document.createElement("td");
      tdN.textContent = notesForEntry(entry, lang);
      var tdL = document.createElement("td");
      var a = document.createElement("a");
      a.href = entry.url || "#";
      a.rel = "noopener noreferrer";
      a.target = "_blank";
      a.textContent = t.history_link_open || "Open";
      tdL.appendChild(a);
      tr.appendChild(tdV);
      tr.appendChild(tdD);
      tr.appendChild(tdN);
      tr.appendChild(tdL);
      tbody.appendChild(tr);
    });
    status.textContent = "";
    status.style.display = "none";
    wrap.hidden = false;
  }

  function showHistoryMessage(lang, keyHtml) {
    var t = I18N[lang] || I18N.zh;
    var status = document.getElementById("history-status");
    var wrap = document.getElementById("history-table-wrap");
    if (!status) return;
    if (wrap) wrap.hidden = true;
    status.style.display = "";
    status.innerHTML = t[keyHtml] != null ? t[keyHtml] : "";
  }

  function loadHistoryVersions(lang) {
    var status = document.getElementById("history-status");
    var t = I18N[lang] || I18N.zh;
    if (status) {
      status.style.display = "";
      status.textContent = t.history_loading || "";
    }

    fetch("versions.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        return res.json();
      })
      .then(function (data) {
        var list = parseVersionsList(data);
        if (list.length === 0) {
          if (status) {
            status.textContent = "";
            status.style.display = "none";
          }
          var wrapEmpty = document.getElementById("history-table-wrap");
          if (wrapEmpty) wrapEmpty.hidden = true;
          return;
        }
        renderHistoryTable(list, lang);
      })
      .catch(function () {
        showHistoryMessage(lang, "history_err_load");
      });
  }

  function initHistoryPage() {
    var lang = getLang();
    applyI18nStrings(lang);
    loadHistoryVersions(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body && document.body.getAttribute("data-page");
    if (page === "history") {
      initHistoryPage();
      document.querySelectorAll(".lang-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var l = btn.getAttribute("data-set-lang");
          if (!l) return;
          setLang(l);
          loadHistoryVersions(l);
        });
      });
      return;
    }

    setLang(getLang());
    loadHeroVersion();
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var l = btn.getAttribute("data-set-lang");
        if (l) setLang(l);
      });
    });
  });
})();
