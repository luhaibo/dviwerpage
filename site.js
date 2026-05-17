(function () {
  "use strict";

  var STORAGE_KEY = "dviewer-site-lang";

  var I18N = {
    zh: {
      nav_aria: "主导航",
      nav_features: "功能",
      nav_workflow: "使用方式",
      nav_tech: "技术",
      nav_docs: "文档",
      nav_download: "下载",
      hero_h1: "在本地清晰查看口腔 CBCT 与全景 DICOM",
      hero_lead:
        "<strong>DViewer</strong> 是 <strong>LuXOne</strong> 旗下的 Windows 桌面端医学影像查看程序。指定包含 DICOM 的文件夹即可<strong>递归扫描</strong>子目录，自动进入全景浏览或 CBCT 多页工作流，并由 GPU（wgpu）加速显示。",
      cta_download: "下载 DViewer",
      cta_how: "使用方式",
      features_h2: "核心功能",
      card1_h3: "以文件夹为中心",
      card1_p:
        "支持命令行传入路径，或使用程序<strong>标题栏</strong>中的文件夹图标选择目录；自动递归扫描子文件夹中的 DICOM。",
      card2_h3: "智能进入模式",
      card2_p:
        "扫描到<strong>多个</strong> DICOM 时进入 CBCT 外壳（MPR、CPR、Side、TMJ、Report 等 Tab）；<strong>单个</strong>文件默认走首张全景；若为单文件体数据，启动时可加 <code>--cbct</code> 进入 CBCT。",
      card3_h3: "GPU 加速渲染",
      card3_p: "基于 wgpu，为二维切片与三维相关视图提供流畅的窗宽窗位与交互基础。",
      workflow_h2: "快速开始",
      step1: "<strong>准备数据</strong> — 将病例 DICOM 放在同一文件夹内（可含子目录）。",
      step2:
        "<strong>启动程序</strong> — 运行 <code>d-viewer.exe</code> 并传入文件夹路径，或使用标题栏「打开文件夹」图标。",
      step3:
        "<strong>阅片</strong> — 在全景或各 CBCT Tab 中浏览；详细说明见主仓库 <code>DViewer/docs/</code> 下的用户手册与设计文档。",
      tech_h2: "技术栈",
      tech_tags_aria: "技术标签",
      tech_fine:
        "DViewer 在 LuXOne <code>rust-cbct</code> 工作区中开发，与 PatientManager 等组件共享字体与图标资源。",
      docs_h2: "文档与支持",
      docs_p:
        "应用源码与说明位于主仓库 <code>DViewer/docs/</code>：<code>DViewer_User_Manual.md</code>（英文用户手册）、<code>CBCT_VIEWER.md</code>（界面与 Tab 约定）。可将 HTML 版手册用 Word 另存为 docx，或使用 Pandoc 导出，详见手册内说明。",
      footer_text: "LuXOne · DViewer 医学影像查看",
      meta_desc: "LuXOne DViewer — 本地查看口腔 CBCT、全景等 DICOM 医学影像。",
      lang_aria: "界面语言",
    },
    en: {
      nav_aria: "Primary",
      nav_features: "Features",
      nav_workflow: "Get started",
      nav_tech: "Technology",
      nav_docs: "Docs",
      nav_download: "Download",
      hero_h1: "Local DICOM viewing for dental CBCT and panoramic studies",
      hero_lead:
        "<strong>DViewer</strong> is a Windows desktop application from <strong>LuXOne</strong>. Point it at a folder of DICOM files: it scans recursively, then opens panoramic or CBCT-style workflows with GPU-accelerated display.",
      cta_download: "Download DViewer",
      cta_how: "How it works",
      features_h2: "Features",
      card1_h3: "Folder-first workflow",
      card1_p:
        "Launch with a path on the command line or pick a folder from the <strong>title bar</strong>. Subfolders are scanned automatically.",
      card2_h3: "Smart routing",
      card2_p:
        "Multiple DICOM files open the CBCT shell (MPR, CPR, Side, TMJ, Report). A single file defaults to panoramic; use <code>--cbct</code> for a one-file volume.",
      card3_h3: "GPU rendering",
      card3_p:
        "Built on wgpu for responsive 2D/3D-style views and consistent window/level pipelines.",
      workflow_h2: "Get started",
      step1: "<strong>Prepare data</strong> — place study DICOMs in one folder (nested folders are fine).",
      step2:
        "<strong>Run DViewer</strong> — execute <code>d-viewer.exe</code> with the folder path, or use the in-app folder icon.",
      step3:
        "<strong>Review</strong> — use panoramic or CBCT tabs; see <code>DViewer/docs/DViewer_User_Manual.md</code> in the LuXOne <code>rust-cbct</code> repository for details.",
      tech_h2: "Technology",
      tech_tags_aria: "Tech stack",
      tech_fine:
        "DViewer is developed in the LuXOne <code>rust-cbct</code> workspace and shares fonts/icons with other LuXOne desktop components.",
      docs_h2: "Documentation",
      docs_p:
        "In the application source tree: <code>DViewer/docs/DViewer_User_Manual.md</code> (English user manual), <code>DViewer/docs/CBCT_VIEWER.md</code> (UI design notes). Export to Word via HTML or Pandoc as described in the manual.",
      footer_text: "LuXOne · DViewer · Medical imaging",
      meta_desc:
        "LuXOne DViewer — local DICOM viewer for dental CBCT and panoramic imaging.",
      lang_aria: "Display language",
    },
  };

  function getLang() {
    var s = localStorage.getItem(STORAGE_KEY);
    if (s === "en" || s === "zh") return s;
    return "zh";
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "zh") lang = "zh";
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    var t = I18N[lang];
    if (!t) return;

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.meta_desc);

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

    var tags = document.querySelector(".tags");
    if (tags && t.tech_tags_aria) tags.setAttribute("aria-label", t.tech_tags_aria);

    var langGroup = document.querySelector(".lang-switch");
    if (langGroup && t.lang_aria) langGroup.setAttribute("aria-label", t.lang_aria);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var l = btn.getAttribute("data-set-lang");
      btn.classList.toggle("active", l === lang);
      btn.setAttribute("aria-pressed", l === lang ? "true" : "false");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLang(getLang());
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var l = btn.getAttribute("data-set-lang");
        if (l) setLang(l);
      });
    });
  });
})();
