document.addEventListener("DOMContentLoaded", function () { let t = document.querySelector(".select-header"), e = document.querySelector(".select-header__title"), n = document.querySelector(".select-options"), o = document.querySelector(".select-box"), r = document.querySelector(".arrow-down__icon"), s = document.querySelectorAll(".select-options__item"), l = e.textContent, c = l, i = null, a = null; function d() { o.style.gridTemplateRows = "0fr", n.style.opacity = "0", r.style.transform = "rotate(0deg)", s.forEach(t => { t.style.opacity = "0" }) } t.addEventListener("click", function () { "1fr" === o.style.gridTemplateRows ? d() : (o.style.gridTemplateRows = "1fr", n.style.opacity = "1", r.style.transform = "rotate(180deg)", s.forEach((t, e) => { t.style.opacity = "1", t.style.transition = `opacity 0.2s ease ${.1 * e}s` }), i ? e.textContent = i.textContent : a && (e.textContent = a.textContent)) }), s.forEach(t => { t.addEventListener("mouseover", function () { c = t.textContent, e.textContent = c }), t.addEventListener("mouseout", function () { i || (e.textContent = l) }), t.addEventListener("click", function () { e.textContent = t.textContent, d(), a = i = t }) }), document.addEventListener("click", function (n) { n.target !== t && (i || (e.textContent = l), d()) }), t.addEventListener("click", function (t) { t.stopPropagation() }) });