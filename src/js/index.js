import { Lunar } from "./Lunar.js";
import { Loader } from "./loader.js";
import { LnLazy } from "./LnLazy.js";

window.lunar = new Lunar;

customElements.define("ln-loader", Loader);
customElements.define("ln-lazy", LnLazy);
