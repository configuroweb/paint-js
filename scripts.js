"use strict";

let canvas = document.querySelector("#drawing-canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let contx = canvas.getContext("2d");
contx.lineWidth = 5;
contx.strokeStyle = "black";
let prevX = null;
let prevY = null;
let drawing = false;

window.addEventListener("mousedown", (e) => (drawing = true));
window.addEventListener("mouseup", (e) => (drawing = false));
window.addEventListener("mousemove", (e) => {
	if (prevX == null || prevY == null || !drawing) {
		prevX = e.clientX;
		prevY = e.clientY;
		return;
	}
	let mousX = e.clientX;
	let mousY = e.clientY;
	contx.beginPath();
	contx.moveTo(prevX, prevY);
	contx.lineTo(mousX, mousY);
	contx.stroke();

	prevX = e.clientX;
	prevY = e.clientY;
});

let colorBoxes = document.querySelectorAll(".colors");
colorBoxes.forEach((box) => {
	box.addEventListener("click", () => {
		contx.strokeStyle = box.style.backgroundColor;
	});
});

let clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
	contx.clearRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", () => {
	console.log("yooo");
	let data = canvas.toDataURL("image/png");
	let a = document.createElement("a");
	a.href = data;
	a.download = "sketch.png";
	a.click();
});

let colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", (e) => {
	contx.strokeStyle = e.target.value;
});
let penWidth = document.querySelector("#pen-width");
penWidth.addEventListener("change", (e) => {
	contx.lineWidth = e.target.value;
});

"use strict";

let canvas = document.querySelector("#drawing-canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let contx = canvas.getContext("2d");
contx.lineWidth = 5;
contx.strokeStyle = "black";
let prevX = null;
let prevY = null;
let drawing = false;

function setPosition(e, isTouch = false) {
    if (isTouch) {
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
    } else {
        prevX = e.clientX;
        prevY = e.clientY;
    }
}

window.addEventListener("mousedown", (e) => {
    drawing = true;
    setPosition(e);
});
window.addEventListener("mouseup", () => (drawing = false));
window.addEventListener("mouseout", () => (drawing = false)); // Agregado para manejar cuando el puntero sale del canvas
window.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    contx.beginPath();
    contx.moveTo(prevX, prevY);
    contx.lineTo(e.clientX, e.clientY);
    contx.stroke();
    setPosition(e);
});

// Eventos táctiles
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevenir scroll/zoom en dispositivos móviles
    drawing = true;
    setPosition(e, true);
}, false);
canvas.addEventListener("touchend", () => {
    e.preventDefault(); // Prevenir scroll/zoom en dispositivos móviles
    drawing = false;
}, false);
canvas.addEventListener("touchcancel", () => {
    e.preventDefault(); // Prevenir scroll/zoom en dispositivos móviles
    drawing = false;
}, false);
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevenir scroll/zoom en dispositivos móviles
    if (!drawing) return;
    contx.beginPath();
    contx.moveTo(prevX, prevY);
    contx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    contx.stroke();
    setPosition(e, true);
}, false);

let colorBoxes = document.querySelectorAll(".colors");
colorBoxes.forEach((box) => {
    box.addEventListener("click", () => {
        contx.strokeStyle = box.style.backgroundColor;
    });
});

let clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
    contx.clearRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save-btn");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
});

let colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", (e) => {
    contx.strokeStyle = e.target.value;
});

let penWidth = document.querySelector("#pen-width");
penWidth.addEventListener("change", (e) => {
    contx.lineWidth = e.target.value;
});

