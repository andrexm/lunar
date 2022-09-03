import { lunar } from "./app.js";

/**
 * Elements that can be hidded
 */
 const hideable = lunar.all('[hideable]');
 hideable.forEach(el => {
     el.classList.add('lunar-hidden');
 });
 
 /**
  * Elements that controls hideable elements
  */
 const hideControllers = lunar.all('[data-hidecontrols]');
 
 hideControllers.forEach(el => {
     el.addEventListener('click', () => {
         let hideableTarget = lunar.el(el.dataset.hidecontrols).pure;
         hideableTarget.classList.toggle('lunar-hidden');
     });
 });
 