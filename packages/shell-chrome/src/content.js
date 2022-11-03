const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.runtime.getURL("document.js"));
document.documentElement.appendChild(script);

// initStorage().then(() => {

//     script.addEventListener("load", () => {

//     });

// })


