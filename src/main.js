import "./reset.css";
import "./style.css";
import "./fonts.css";
import "remixicon/fonts/remixicon.css";

import { Falcos } from "./falcos.js";

const WIDTH = 1920;
const HEIGHT = 1080

const falcos = new Falcos(WIDTH, HEIGHT);
const preview = document.getElementById("preview");
preview.width = WIDTH;
preview.height = HEIGHT;
const ctx = preview.getContext("2d");

const promises = [
    document.fonts.ready,
];

let ready = false;

let data;
let previewIndex = 0;

Promise.all(promises).then(() => {
    ready = true;
});

const fileInput = document.getElementById("file");
fileInput.addEventListener("change", () => {
    if (fileInput.files.length == 1) {
        const file = fileInput.files[0];
        file.text().then(result => {
            data = parseCSV(result);
            console.log(data);
            update();
        });
    }
});

document.getElementById("preview-left").addEventListener("click", () => {
    previewIndex--;
    update();
});

document.getElementById("preview-right").addEventListener("click", () => {
    previewIndex++;
    update();
});

document.getElementById("preview-index").addEventListener("input", e => {
    previewIndex = e.target.value;
    update();
});

document.getElementById("name-style").addEventListener("input", () => {
    update();
});

document.getElementById("custom-rows").addEventListener("input", () => {
    update();
});

function update() {
    if (data && ready) {
        previewIndex = clamp(previewIndex, 0, data.length - 1);
        const story = data[previewIndex];

        let nominees = story.nominees;

        const nameStyle = document.getElementById("name-style").value;
        if (nameStyle == "init-first") {
            nominees = story.nominees.map(item => initialFirst(item));
        } else if (nameStyle == "init-last") {
            nominees = story.nominees.map(item => initialLast(item));
        }

        ctx.drawImage(falcos.generate(story.title, nominees), 0, 0);

        document.getElementById("preview-index").value = previewIndex;
        document.getElementById("preview-info").textContent = story.title;
    }
}

function parseCSV(raw) {
    try {
        // Split CSV into two-dimensional array
        let array = raw.split("\n");
        array = array.map(row => row.split(","));
        // Remove rows that do not have a story title
        array = array.filter(row => row[columnToIndex("D")]?.trim());
        // Remove the first row
        array.shift();
        // Isolate the story title and nominee names
        let formatted = array.map(row => {
            const nomineeOrder = "NOPQSTUVWXHIJKLF".split("").map(letter => columnToIndex(letter));
            const nominees = [];
            nomineeOrder.forEach(index => {
                if (row[index]) {
                    nominees.push(row[index].trim());
                }
            });
            return {
                title: row[columnToIndex("D")].trim(),
                nominees: nominees,
            };
        });
        return formatted;
    } catch (err) {
        console.error(err);
    }
}

function columnToIndex(column) {
    const letters = column.split("").reverse();
    let total = 0;
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const value = (letter.charCodeAt(0) - 65 + 1) * (26 ** i);
        total += value;
    }
    return total - 1;
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function initialFirst(name) {
    const parts = name.split(" ");
    if (parts.length == 2) {
        return `${parts[0].substring(0, 1)}. ${parts[1]}`;
    } else {
        return name;
    }
}

function initialLast(name) {
    const parts = name.split(" ");
    if (parts.length == 2) {
        return `${parts[0]} ${parts[1].substring(0, 1)}.`;
    } else {
        return name;
    }
}