// 목록을 처음에 몇 개만 보여주고, "전체 보기" 버튼으로 나머지를 펼치는 스크립트.
// 사용법: <ul class="paper-list" data-limit="2"> 처럼 data-limit에 처음 보여줄 개수를 적으면 됩니다.
(function () {
  document.querySelectorAll("ul[data-limit]").forEach(list => {
    const limit = parseInt(list.dataset.limit, 10);
    const items = [...list.children];
    if (!limit || items.length <= limit) return; // 개수가 적으면 버튼 없음

    const extra = items.slice(limit);
    const nav = document.createElement("nav");
    nav.className = "tabs more";
    nav.style.margin = "16px 0 0";
    const btn = document.createElement("a");
    btn.href = "#";
    btn.setAttribute("role", "button");
    nav.appendChild(btn);
    list.after(nav);

    let open = false;
    function render() {
      extra.forEach(li => { li.hidden = !open; });
      btn.textContent = open ? "접기 ▴" : `전체 보기 (${items.length}) ▾`;
      btn.setAttribute("aria-expanded", open);
    }
    btn.addEventListener("click", e => {
      e.preventDefault();
      open = !open;
      render();
      if (!open) list.closest("section")?.scrollIntoView({ block: "start" });
    });
    render();
  });
})();
