import "./reset.css";
import "./style.css";
import "./fonts.css";

import { Falcos } from "./falcos";

const falcos = new Falcos(1920, 1080, {

});

const output = document.getElementById("output");
output.width = 1920;
output.height = 1080;
const ctx = output.getContext("2d");

let ready = false;

const promises = [
    document.fonts.ready,
];

falcos.initializeFont("16px Montserrat-SemiBold");
falcos.initializeFont("16px LinLibertineCapitalsB");

Promise.all(promises).then(() => {
    ready = true;
    ctx.drawImage(falcos.generate("New Decade Resolutions Testing", ["Seancris Luyun", "Aidan Andres", "Hameed Abdul"]), 0, 0);
});