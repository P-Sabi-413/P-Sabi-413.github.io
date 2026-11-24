// 글(.article) 안의 h2, h3 제목을 읽어서 왼쪽 목차를 자동으로 만드는 스크립트.
// 제목을 추가·수정하면 목차도 저절로 바뀝니다. (따로 고칠 필요 없음)
(function () {
  const article = document.querySelector(".article");
  if (!article) return;

  const heads = [...article.querySelectorAll("h2, h3")];
  if (!heads.length) return;

  // 각 제목에 이동용 id 붙이기 (예: "2-1. 프로토콜" → id="s2-1")
  const used = new Set();
  heads.forEach((h, i) => {
    if (!h.id) {
      const num = h.textContent.trim().match(/^(\d+(?:[-.]\d+)*)/);
      let id = num ? "s" + num[1].replace(/\./g, "-") : "sec" + (i + 1);
      while (used.has(id)) id += "_";
      h.id = id;
    }
    used.add(h.id);
  });

  // 목차 만들기
  const items = heads.map(h =>
    `<li class="toc-${h.tagName.toLowerCase()}"><a href="#${h.id}">${h.textContent.trim()}</a></li>`
  ).join("");

  const toc = document.createElement("details");
  toc.className = "toc";
  toc.open = true;
  toc.innerHTML = `<summary>목차</summary><nav><p class="toc-title">CONTENTS</p><ul>${items}</ul></nav>`;
  document.body.classList.add("has-toc");
  article.parentNode.insertBefore(toc, article);

  // 목차 클릭 시 부드럽게 이동 + 모바일에선 목차 접기
  toc.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1099px)").matches) toc.open = false;
    });
  });

  // 지금 읽고 있는 위치를 목차에서 강조
  const links = [...toc.querySelectorAll("a")];
  function update() {
    let current = 0;
    heads.forEach((h, i) => { if (h.getBoundingClientRect().top < 140) current = i; });
    links.forEach((a, i) => a.classList.toggle("active", i === current));
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();
