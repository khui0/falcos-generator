import "./reset.css";
import "./style.css";
import "./fonts.css";

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

falcos.initializeFont("16px Montserrat-SemiBold");
falcos.initializeFont("16px LinLibertineCapitalsB");

Promise.all(promises).then(() => {
    ctx.drawImage(falcos.generate("New Decade Resolutions Testing", ["Seancris Luyun", "Aidan Andres", "Hameed Abdul"]), 0, 0);
});