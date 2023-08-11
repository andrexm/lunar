(()=>{"use strict";class LunarElement{pure;constructor(t){this.pure="object"!=typeof t?document.querySelector(t):t}get type(){return this.pure.nodeName.toLowerCase()}get id(){return this.pure.id}html(t=null){if(!t)return this.pure.innerHTML;this.pure.innerHTML=t}text(t=null){if(!t)return this.pure.textContent;this.pure.textContent=t}attr(t,e=null){return e?(this.pure.setAttribute(t,e),this):this.pure.getAttribute(t)}hasAttr(){let t=!0;return Array.from(arguments).forEach((e=>{t=t&&this.pure.hasAttribute(e)})),t}removeAttr(t){return this.pure.removeAttribute(t),this}matches(t){return this.pure.matches(t)}event(t,e){this.pure.addEventListener(t,(t=>{e(t)}))}get width(){return this.pure.clientWidth}get height(){return this.pure.clientHeight}toggle(){return lunar.toggle(this),this}appear(t=null){return t?this.pure.scrollIntoView(t):this.pure.scrollIntoView(),this}click(){return this.pure.click(),this}parent(t=1){let e=this.pure;do{e=e.parentElement,t--}while(t>0);return lunar.el(e)}get nodes(){return this.pure.childNodes}get children(){let t=Array.from(this.pure.children),e=[];return t.forEach((t=>{e=[...e,lunar.el(t)]})),e}get firstEl(){return lunar.el(this.pure.firstElementChild)}get lastEl(){return lunar.el(this.pure.lastElementChild)}get firstNode(){return this.pure.firstChild}get lastNode(){return this.pure.lastChild}sibling(t=1){let e=this.pure;if(t>0)do{e=e.nextSibling,t--}while(t>0);if(t<0)do{e=e.previousSibling,t++}while(t<0);return e instanceof Element?lunar.el(e):e}after(){return lunar.iterate(Array.from(arguments),(t=>{this.pure.after(t)})),this}before(){return lunar.iterate(Array.from(arguments),(t=>{this.pure.before(t)})),this}append(){return lunar.iterate(Array.from(arguments),(t=>{this.pure.append(t)})),this}prepend(){return lunar.iterate(Array.from(arguments),(t=>{this.pure.prepend(t)})),this}el(t){return lunar.el(this.pure.querySelector(t))}all(t,e=!1){let r=Array.from(this.pure.querySelectorAll(t));if(e)return r;let s=[];return r.forEach((t=>{s=[...s,lunar.el(t)]})),s}contains(t){return t=lunar.isPure(t)?t:t.pure,this.pure.contains(t)}hasClass(t){return this.pure.classList.contains(t)}addClass(t){return this.pure.classList.add(t),this}removeClass(t){return this.pure.classList.remove(t),this}toggleClass(){return Array.from(arguments).forEach((t=>{this.pure.classList.toggle(t)})),this}get classList(){return this.pure.classList}}const t=[{name:"date",action(t,e){let r=new Date(1e3*Number(e)),s=r.getUTCDate(),i=Number(r.getMonth())+1;return Number(s)<10&&(s="0"+s),String(i)<10&&(i="0"+i),s+"/"+i+"/"+r.getUTCFullYear()}},{name:"hour",action(t,e){let r=new Date(Number(e));return r.getUTCHours()+":"+r.getUTCMinutes()}},{name:"percent",action:(t,e,r)=>(e=String(100*Number(e)),r.length>0&&(e=e.replace(".",r[0])),e+"%")}],e={showElement(t,e=!0){t.style.transition="0.3s",e?(t.classList.remove("lunar-hidden"),setTimeout((()=>{t.classList.remove("lunar-opacity-0")}),0)):(t.classList.add("lunar-opacity-0"),t.style.transition="0.3s",setTimeout((()=>t.classList.add("lunar-hidden")),300))},hideableElementsStart(){this.hideable=Array.from(document.querySelectorAll("[hideable]")),this.hideable.forEach((t=>{t.classList.contains("l-hes")||(t.classList.add("lunar-hidden"),t.classList.add("lunar-opacity-0"),t.classList.add("l-hes"))}))},hideControllersStart(){this.hideControllers=Array.from(document.querySelectorAll("[data-toggle]")),this.hideControllers.forEach((t=>{t.classList.contains("l-shc")||(t.addEventListener("click",(()=>{let e=new LunarElement(t.dataset.toggle).pure,r=e.classList.contains("lunar-hidden");this.showElement(e,r),this.clickOutside(e,(r=>{let s=Array.from(document.querySelectorAll(`[data-toggle='${t.dataset.toggle}']`)),i=!1;s.forEach((t=>{i=i||r.target===t||t.contains(r.target)})),i||this.showElement(e,!1)}))})),t.classList.add("l-shc"))}))},clickOutside(t,e){t.classList.contains("rcoutside")||(t.classList.add("rcoutside"),document.addEventListener("click",(r=>{t.contains(r.target)||t===r.target||e(r)})))},hideOnLeave(){Array.from(document.querySelectorAll("[hideOnMouseLeave]")).forEach((t=>{t.classList.contains("l-shol")||(t.setAttribute("tabindex","0"),t.addEventListener("mouseleave",(()=>{this.showElement(t,!1)})),t.classList.add("l-shol"))}))},hideOnClickOutside(){Array.from(document.querySelectorAll("[hideOnClickOutside]")).forEach((t=>{t.classList.contains("l-hoco")||(t.setAttribute("tabindex","0"),document.addEventListener("click",(e=>{t.parentNode.contains(e.target)||t===document.activeElement||t.contains(document.activeElement)||t.classList.contains("lunar-hidden")||this.showElement(t,!1)})),t.classList.add("l-hoco"))}))},dynamicLinks(){Array.from(document.querySelectorAll("[link]")).forEach((t=>{t.classList.contains("l-dl")||(t.style.cursor="pointer",t.addEventListener("click",(()=>{location.href=t.getAttribute("link")})),t.classList.add("l-dl"))}))},loadModifiers(e){let r=Array.from(document.querySelectorAll("[mod]")),s=e??t;r.forEach((t=>{if(t.classList.contains("l-mod"))return;let e=t.getAttribute("mod").split("|");e.splice(0,1);let r=s.find((e=>e.name==t.getAttribute("mod").split("|")[0]));r&&(t.innerHTML=r.action(t,t.textContent,e),t.classList.add("l-mod"))}))}};class Store{state={};storeName="lunarStore";constructor(){this.startState()}startState(){let t=localStorage.getItem(this.storeName)??"{}";t=JSON.parse(t),this.state=t}save(t,e){this.state[t]=e,localStorage.setItem(this.storeName,JSON.stringify(this.state))}remove(t){delete this.state[t],localStorage.setItem(this.storeName,JSON.stringify(this.state))}get(t){return this.state[t]}}class Ajax{#t;#e=!1;#r;#s={method:"GET",url:"",headers:{},data:{},beforeSend:()=>{},success:()=>{},error:()=>{}};constructor(t){this.#i(t),this.#t=new XMLHttpRequest,this.#s=t,"method"in this.#s?this.#r=this.#s.method.toUpperCase():this.#r="GET"}send(){this.#n(),this.#t.open(this.#r,this.#s.url),this.#a(),this.#t.send(this.#s.data||null)}#n(){this.#t.onreadystatechange=()=>{if(this.#e||(this.#e=!0,"beforeSend"in this.#s&&this.#s.beforeSend(this.#t)),4===this.#t.readyState){if(200===this.#t.status&&"success"in this.#s)return this.#s.success(this.#t.response,this.#t.status,this.#t);if("error"in this.#s)return this.#s.error()}}}#a(){if("headers"in this.#s){Object.keys(this.#s.headers).forEach((t=>{this.#t.setRequestHeader(t,this.#s.headers[t])}))}}#i(t){return"url"in t||console.error("Error: please, set an URL."),!1}}class Loader extends HTMLElement{static get observedAttributes(){return["color"]}constructor(){super()}attributeChangedCallback(t,e,r){let s=r.split(",");this.style.borderColor=s[0]??"#f3f3f3",this.style.borderTopColor=s[1]??"#3498db"}}class LnLazy extends HTMLElement{#l;#o;loaded=()=>{};constructor(){super(),this.style.paddingTop="400px",this.#l=!1,this.#o=this.getBoundingClientRect().top+window.scrollY,this.start(window.innerHeight>=this.getBoundingClientRect().top)}#h(t){if(this.#l)return!1;if(window.scrollY+window.innerHeight+Number(this.getAttribute("dis")??400)>=this.#o||t){let t=this.getAttribute("src");lunar.ajax({method:"GET",url:t,success:t=>{this.innerHTML=t,this.#l=!0,lunar.loadHelpers(),this.loaded()},error:()=>{console.error("The component "+t+" cannot be loaded."),this.#l=!0}}).send(),this.style.paddingTop="0px"}return!1}start(t){if(t)return this.#h(t),!1;document.addEventListener("scroll",(()=>{this.#h(t)}))}}window.lunar=new class Lunar{modifiers=[];store;custom=[];constructor(){this.store=new Store,this.loadHelpers(),window.addEventListener("load",(()=>{let t=lunar.el("ln-back-loader");t&&t.toggle()}))}isPure(t){return!(t instanceof LunarElement)}iterate(t,e){t.forEach((t=>{t=lunar.isPure(t)?t:t.pure,e(t)}))}el(t){let e=new LunarElement(t);return e.pure?e:null}all(t,e=!1){let r=Array.from(document.querySelectorAll(t));if(e)return r;let s=[];return r.forEach((t=>{s=[...s,new LunarElement(t)]})),s}create(t){let e=document.createElement(t);return this.el(e)}hide(t){return this.isPure(t)?e.showElement(t,!1):e.showElement(t.pure,!1)}show(t){return this.isPure(t)?e.showElement(t):e.showElement(t.pure)}appear(t,e=null){return lunar.el(t).appear(e)}toggle(){Array.from(arguments).forEach((t=>{let e=this.isPure(t)?t:t.pure;e.classList.contains("lunar-hidden")?this.show(e):this.hide(e)}))}clickOut(t,r){e.clickOutside(this.isPure(t)?t:t.pure,r)}register(t,e=!0){t.forEach((t=>{e&&(this.custom=[...this.custom,t]),Array.from(document.querySelectorAll(t.selector)).forEach((e=>{if(e.innerHTML=t.html,e.dataset.class){let t=e.firstElementChild;e.dataset.class.split(" ").forEach((e=>{t.classList.add(e)}))}}))})),this.loadHelpers()}registerMods(t){this.modifiers=[...this.modifiers,...t],e.loadModifiers(this.modifiers)}loadHelpers(){e.hideControllersStart(),e.hideableElementsStart(),e.hideOnLeave(),e.dynamicLinks(),e.hideOnClickOutside(),e.loadModifiers(),e.loadModifiers(this.modifiers)}loadUtils(){this.register(this.custom,!1)}ajax(t){return new Ajax(t)}},customElements.define("ln-loader",Loader),customElements.define("ln-lazy",LnLazy)})();