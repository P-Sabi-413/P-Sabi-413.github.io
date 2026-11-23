// 모든 페이지에 상단 바(메뉴 버튼 + 413.log)와 왼쪽 메뉴 서랍을 넣는 스크립트.
// 메뉴 항목을 바꾸려면 아래 MENU 배열만 고치면 됩니다.
(function () {
  const MENU = [
    { label: "개발",            path: "dev/" },
    { label: "CTF/Wargame",     path: "ctf/" },
    { label: "Bug Bounty",      path: "bugbounty/" },
    { label: "블로그/기술문서",  path: "blog/" },
    { label: "논문/컨퍼런스",    path: "paper/" },
    { label: "공모전/자격증",    path: "contest/" },
  ];

  // 페이지 위치에 따라 루트 경로를 맞춤 (홈: "./", 하위 페이지: "../")
  const root = document.currentScript.dataset.root || "./";
  const here = location.pathname;

  const items = MENU.map(m => {
    const current = here.includes("/" + m.path) ? ' aria-current="page"' : "";
    return `<li><a href="${root}${m.path}"${current}>${m.label}</a></li>`;
  }).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="topbar">
      <button class="menu-btn" aria-label="메뉴 열기" aria-controls="drawer" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <a class="brand" href="${root}">413<b>.log</b></a>
    </header>
    <div class="overlay"></div>
    <aside class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer-head">
        <a class="brand" href="${root}">413<b>.log</b></a>
        <button class="close-btn" aria-label="메뉴 닫기">×</button>
      </div>
      <nav><ul>${items}</ul></nav>
      <div class="drawer-foot">
        <a href="${root}#about">About</a> · <a href="${root}#contact">Contact</a>
      </div>
    </aside>
  `);

  const btn = document.querySelector(".menu-btn");
  const drawer = document.querySelector(".drawer");
  const overlay = document.querySelector(".overlay");

  function setOpen(open) {
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
    btn.setAttribute("aria-expanded", open);
    drawer.setAttribute("aria-hidden", !open);
  }
  btn.addEventListener("click", () => setOpen(true));
  overlay.addEventListener("click", () => setOpen(false));
  document.querySelector(".close-btn").addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  drawer.querySelectorAll(".drawer-foot a").forEach(a => a.addEventListener("click", () => setOpen(false)));
})();
