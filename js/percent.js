const lineImage = document.getElementById("line-image"), circle = document.getElementById("circle"), percentText = document.querySelector(".line-title__percent"); let isDragging = !1; circle.addEventListener("mousedown", e => { isDragging = !0, e.preventDefault() }), document.addEventListener("mousemove", e => { if (isDragging) { let t = lineImage.getBoundingClientRect(), i = e.clientX - t.left, n = t.width, g = i / n * 100, l = Math.min(100, Math.max(0, g)); circle.style.right = `${96 - l}%`, percentText.textContent = `${l.toFixed(2)}%` } }), document.addEventListener("mouseup", () => { isDragging = !1 });