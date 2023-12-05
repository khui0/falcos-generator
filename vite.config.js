import webfontDownload from "vite-plugin-webfont-dl";

export default {
    base: "/falcos-generator/",
    plugins: [
        webfontDownload(),
    ],
};