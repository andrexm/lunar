# Lunar

Lunar is a library for creating frontend projects in a very simple way. To use it, just add to your project the styles and the scripts inside the dist folder. Be creative.

## Table of Contents

- [Lunar](#lunar)
  - [Table of Contents](#table-of-contents)
  - [The basic Lunar methods](#the-basic-lunar-methods)
    - [el()](#el)
    - [all()](#all)
    - [isPure()](#ispure)
    - [iterate()](#iterate)
    - [create()](#create)
    - [hide()](#hide)
    - [show()](#show)
    - [toggle()](#toggle)
    - [appear()](#appear)
    - [clickOut()](#clickout)
  - [The Lunar Elements](#the-lunar-elements)
    - [About the element](#about-the-element)
      - [type](#type)
      - [id](#id)
      - [html()](#html)
      - [text()](#text)
      - [attr()](#attr)
      - [hasAttr()](#hasattr)
      - [removeAttr()](#removeattr)
      - [matches()](#matches)
      - [event()](#event)
      - [width](#width)
      - [height](#height)
      - [toggle()](#toggle-1)
      - [appear()](#appear-1)
      - [click()](#click)
    - [Related nodes](#related-nodes)
      - [parent()](#parent)
      - [nodes](#nodes)
      - [children](#children)
      - [firstEl](#firstel)
      - [lastEl](#lastel)
      - [firstNode](#firstnode)
      - [lastNode](#lastnode)
      - [sibling()](#sibling)
      - [after()](#after)
      - [before()](#before)
      - [append()](#append)
      - [prepend()](#prepend)
      - [el()](#el-1)
      - [all()](#all-1)
      - [contains()](#contains)
    - [Working with classes](#working-with-classes)
      - [hasClass()](#hasclass)
      - [addClass()](#addclass)
      - [removeClass()](#removeclass)
      - [toggleClass()](#toggleclass)
      - [classList](#classlist)
  - [Creating components](#creating-components)
  - [Hiding or showing elements](#hiding-or-showing-elements)
    - [Toggle the state of an element](#toggle-the-state-of-an-element)
    - [Hide an element after it losts the focus or a click outside it (not recomended)](#hide-an-element-after-it-losts-the-focus-or-a-click-outside-it-not-recomended)
    - [Hide the element after moving the mouse to outside it](#hide-the-element-after-moving-the-mouse-to-outside-it)
    - [Programmatically show or hide an element](#programmatically-show-or-hide-an-element)
    - [Example](#example)
  - [Modifiers](#modifiers)
    - [List of avaiable modifiers](#list-of-avaiable-modifiers)
      - [Date](#date)
      - [Hour](#hour)
      - [Percent](#percent)
    - [Creating your own modifier](#creating-your-own-modifier)
  - [Links](#links)

## The basic Lunar methods
The Lunar provides a set of very useful methods, that you can use to add and extend the functionalities of your scripts, creating interactive components easily. In this documentation, the Node

### el()
It returns the first element matching the selector passed to it, it means, it simple does the same thing as the _document.querySelector()_ method, but it returns the element inside an instance of the __LunarElement__ class.
```javascript
let el = lunar.el('div');
console.log(el);
```
The _pure_ property returns the original Node object:
```javascript
console.log(el.pure); // <div></div>
```

### all()
It does the same as the _el()_ method, but returns all the ocurrencies for the given selector, just like the _document.querySelectorAll()_, but in array form. You can also pass a second argument, to make this method return an array of Node objects.
```javascript
let divs = lunar.all('div');
let pureDivs = lunar.all('div', true);

console.log(divs);
console.log(pureDivs);
```

### isPure()
This method verify if the given element is a LunarElement or a "pure" Node, such as HTML elements or SVG elements. It returns false if the element is a LunarElement, and true in other cases.
```javascript
let el = document.querySelector('div');
console.log(lunar.isPure(el)); // true
```

### iterate()
This method is used in cases you have an array of LunarElement instances and you have to iterate in each of their pure elements, ignoring the LunarElement instance. See the example:
```javascript
let divs = lunar.all('div');
lunar.iterate(divs, div => {
  console.log(typeof div);
});
```

### create()
It creates a new Node object which is returned as a LunarElement object. You can do with almost anything it is possible with Node objects very easily. See the list of LunarElement methods.
```javascript
let div = lunar.create('div');
```

### hide()
This method is used to hide an element from the page, you can pass to it Element objects or LunarElement objects. When an element is hided by this or similiar methods, it receives the _lunar-hidden_ and the _lunar-opacity-0_ classes, responsible to hide the element followed by a transition effect.
```javascript
let div = lunar.el('div');

lunar.hide(div); // or
lunar.hide(div.pure);
```

### show()
It does the inverse effect of the _hide()_ method, it means, if you have an hidden element, you can use this method to show again that element:
```javascript
lunar.hide(div);
lunar.show(div);
```

### toggle()
Finally, we have a method that does the both effects of the two previous methods. For example, the following code shows and hides an element on each 1s:
```javascript
setInterval(() => {
  lunar.toggle(div);
}, 1000);
```

### appear()
This method simply scrolls the page until the given element is visible and on top of the page. The first parameter is the object to be visible, and the second one is an optional scrollIntoViewOptions object.
```javascript
let contact = lunar.el('#contactInfo');
lunar.appear(contact);
```

### clickOut()
This is a very useful methods, that can give you the ability to create very interactive elements. It simply receives an element (Element or LunarElement) and a closure. Everytime the user click in a element that is not that given one, that closure will be executed, and this maybe very powerful. See the example:
```javascript
let dd = lunar.el('#dropdown');

lunar.clickOut(dd, e => {
  if (!dd.contains(e.target))
    lunar.hide(dd);
});
```
In this example, we listen for a click in a element that is not the _dd_ element, and we pass a closure (the handle function) to handle this event. This closure receives a parameter (it uses the addEventListener method), that is an object describing that event. Inside that closure, we verify if the target element is an element inside _dd_, just to be sure that the click was outside it, and we call the hide() method in case of a click outside it. See the documentation about the [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## The Lunar Elements
Sometimes maybe hard or tiring to work with the defaults properties and methods of the elements and commonly our scripts compound a lot of code, that makes them sometimes difficult to undestand and find some error or bug. Due to this, the LunarElement class provides some very useful methods, that simplifies the most common tasks on working with elements. When you create an instance of that class, you need to pass a selector or an Element instance:
```javascript
let el = lunar.el('#navbar');

// or
let navbar = document.querySelector('#navbar');
let el = lunar.el(navbar);
```
The el() method returns an instance of the LunarElement class with the given element. See below the list of methods and properties present in this class.

### About the element

#### type
This property simply returns the type of the current element:
```javascript
console.log(lunar.el('div').type); // div
```

#### id
Returns the id of the element:
```javascript
console.log(lunar.el('#a').id); // a
```

#### html()
Inserts an HTML code into the element or return the HTML content if the parameter is given:
```javascript
let c = lunar.el('div').html();
console.log(c);

lunar.el('div').html('<button>click</button>');
```

#### text()
It does the same as the _html()_ method, but for text contents:
```javascript
let c = lunar.el('div').text();
console.log(c);

lunar.el('div').text('<button>click</button>'); // See the difference from the html() method
```

#### attr()
This method returns the value of the given attribute and sets a new value if you pass it as a second parameter:
```javascript
let div = lunar.el('div');

console.log(div.attr('class'));
div.attr('class', 'class1 class2');
console.log(div.attr('class'));
```

#### hasAttr()
Returns true if the element has the given attribute.

#### removeAttr()
It removes the given attribute from the element and returns the object itself.

#### matches()
Returns true if the current element matches with the given selectors. The argument is a string of valid CSS selectors.

#### event()
It is a shortcut for the addEventListener() method:
```javascript
lunar.el('div').event('click', e => {
  console.log(e);
});
```

#### width
This property contains current width of the element.

#### height
The current height of the element.

#### toggle()
It does the same effect as the _lunar.toggle()_ to the current element.

#### appear()
It dows the same effect as the _lunar.appear()_ to the current element.

#### click()
This method calls the element.click() function, that fires the element's click event.

### Related nodes
#### parent()
Returns the parent element of the current element. You can pass a number as a parameter informing the parent order of the element:
```html
<section>
  <div><button>Button</button></div>
</section>

<script>
  let btn = lunar.el('button');
  console.log(btn.parent(2)); // Object { pure: section }
</script>
```
The default value for the order is 1.

#### nodes
A property containing all the child nodes of the element.

#### children
A property with all the child elements of the current element.

#### firstEl
It returns the first element node of the current element.

#### lastEl
It returns the last element node of the element.

#### firstNode
The first node inside the element.

#### lastNode
The last node inside the element.

#### sibling()
This method returns the sibling Node after or before the current element. This method gets a parameter called order, whose default value is 1. When the order parameter is 1, the method returns the current element. Values greater than one return the next nth sibling of the element, while negative values return the nth sibling before the element.

#### after()
This method receives any number of elements (LunarElement or Node) to be added after the current element.
```javascript
lunar.el('.list-title').after(item1, item2, ...);
```

#### before()
It does the same as the _after()_ method, but inserts the elements before the current element.

#### append()
It is very similar to the _after()_, but the elements are inserted inside the current element and after its last child.

#### prepend()
It does the same as the _append()_ function, but the elements are inserted before the child node of the current element.

#### el()
Works like the _lunar.el()_ function, but searchs for an element inside the current one.

#### all()
Works like the _lunar.all()_ function, but searchs for elements inside the current one.

#### contains()
It verifies if the given element (Node or LunarElement) is inside the current one, returning true in the positive case and false in the case of not.

### Working with classes
#### hasClass()
It returns true if the current element has that given class name.

#### addClass()
It adds the given class name to the element.

#### removeClass()
It removes the given class name.

#### toggleClass()
This method receives any number of parameters, each one with a class name. Then, all these class names are toggled. It is a very useful method.

#### classList
This property returns a [DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList) collection of the class attributes of the element, and also can be used to manipulate the class list.

## Creating components

You can create a component easily. First of all, to register a component we need to pass an array containing all the components we have created, to call the _lunar.register()_ method, which receives this array. Now, just create an array of components. A component is an object with two elements: an HTML, obviously, and a selector. See the example below:

```html
<app-fruits></app-fruits>

<script>
  let components = [
    {
      html: `
          <div>
            <div class="text-lg">Fruits</div>
            <div class="examples">Mango, mango and mango.</div>
          </div>
      `,
      selector: 'app-fruits'
    },
    ...
  ];

  lunar.register(components);
</script>
```

You can also pass classes to the component you are using throught its selector using the __data-class__ attribute, but, have in mind that, if your component has more than one element side by side, only the first one will receive that classes.

```html
<app-fruits data-class="p-6 mb-4 rounded-md"></app-fruits>
```

Note that you can call the _lunar.register()_ more than one time, this does not have side effects.

## Hiding or showing elements

Lunar has some very useful tools to hide or show an element. It has the following utilities:

- Toggle the state of an element;
- Hide an element after it losts the focus or a click outside it;
- Hide the element after moving the mouse to outside it;
- Programmatically change the element state.

### Toggle the state of an element

Sometimes we need to show an element after a click on another element and hide it after another click. We need simply to add some attributes to this purpuse:

```html
<div data-toggle=".text">Toggle element</div>
<div class="text" hideable>Hello :)</div>
```

The _hideable_ atribute just tells that this element must start hidden, while the _data-toggle_ tells which element will be controlled by this element. This way, a click on the first _div_ will show the second one, another click will hide. You can also put the _data-toggle_ in more than one element to controlls the same one. Note that the element, after visible, is made hidden after a click outside it and outside the element that calls it.

### Hide an element after it losts the focus or a click outside it (not recomended)

This may be a highly useful tool, sometimes. With it, a user can click on a button to show something, click on another and the first one will be hidden, because it simply lost the focus. Se the following example:

```html
<div hideOnClickOutside>Don't click outside me! 😾</div>
```

We can combine both the two last utilities showed until now:

```html
<div data-toggle=".text">Toggle element</div>
<div class="text" hideable hideOnClickOutside>Hello :)</div>
```

### Hide the element after moving the mouse to outside it

Sometimes is more useful to hide the element after the mouse goes away from it. For this case, there is the _hideOnMouseLeave_ attribute:

```html
<div hideOnMouseLeave>Don't forget me 😢</div>
```

As in the previous tool, we can combine it with the _data-toggle_ to create a more dynamic functionality.

### Programmatically show or hide an element

To do this is very simple. There is two methods, __lunar.show()__ and __lunar.hide()__, to show an element and to hide an element, respectively. Both the methods receive an element, obviously. See the example:

```html
<button onclick="lunar.hide(lunar.el('i'))">Hide it</button>
<button onclick="lunar.show(lunar.el('i'))">Show it</button>

<i>123</i>

<!-- LunarJs -->
<script src="dist/js/lunar.js"></script>
```

You can pass to these functions both common elements and an instance of the LunarHTMLElement class. Always you select an element using the _lunar.el()_, what you get is an instance of the LunarHTMLElement class, which has a set of very useful methods.

### Example

In this example, we have a button that shows the alert message after clicking on it. The alert message is a component that also contains another component inside it, an icon. There is two icons registered as components in this code, the first one comes from HeroIcons and the second one from Bootstrap Icons. In the HTML, the code is very clean, mainly when we need to reuse some component, like the icons of the example. Also, the alert component contains a _span_ tag, which can close the alert if clicked due to the _data-toggle_ attribute with a selector pointing to the alert itself.

```html
<div class="btn-primary" data-toggle="#success-msg">
    <icon-download data-class="h-10 w-10"></icon-download> Download
</div>
<app-alert></app-alert>

<!-- LunarJs -->
<script src="dist/js/lunar.js"></script>

<!-- Custom scripts -->
<script>
    let components = [
        {
            html: `
                <div class="alert" hideable id="success-msg">
                    <icon-exclamation data-class="h-10 w-10"></icon-exclamation> Downloading...
                    <span data-toggle="#success-msg">Close</span>
                </div>`,
            selector: 'app-alert'
        },
        {
            html: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>`,
            selector: 'icon-exclamation'
        },
        {
            html: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>`,
            selector: 'icon-download'
        }
    ];

    lunar.register(components);
</script>
```

## Modifiers
Modifiers are a set of useful methods to work with the text content inside an element. It's like the Angular pipes, but poor. To use them, simply add the _mod_ attribute to the element, containing the name of the modifiers as its value. For instance, to convert a timestamp to a date format, just add the _mod_ attribute with the _'date'_ value:
```html
<div mod="date">1663525210</div>
```
This code will show the date in the format d/m/Y. 

### List of avaiable modifiers
There is only a few modifiers by default in this project. The current ones are:

#### Date
Just use the value _'date'_ for the _mod_ attribute, as in the above example.

#### Hour
Works like the _date_ modifier, you pass a timestamp and it will return the hour in 24h format.
```html
<div mod="hour">1663525210</div>
```
#### Percent
It converts a decimal number to a percent value, multiplying it by 100 and adding the _%_ character. This modifier has a difference: we can pass an argument to it. To do this, just add a '|' (pipe) separanting the name of the mod and its params.
```html
<div mod="percent">0.8923</div>
<div mod="percent|,">0.8923</div>
```
As you can see, the param is the character to take the place of the '.' in the value. It is just a detail, but it can make a difference between different languages.

### Creating your own modifier
A modifier is an object containing 2 elements: a name and an action. The 'name' is, obviously, the name of the modifier, that you pass to the _mod_ attribute. The action is a function that receives the element calling the modifier, the text content and the params passed to this modifier, respectively, returning the result. See below an example of mod.
```javascript
// The modifier
const mod = {
    name: 'upper',
    action(el, value, params) {
        return value.toUppercase();
    }
};

// Registering it
lunar.registerMods([mod]);
```

The HTML:
```html
<div mod="upper">I'm not screaming!</div>
```

This is just a very simple example, you can make a lot of stuff with this tools, including working with the element containing that text, due to the fact that it is passed to the action. Note that, the params is an array, so, if you want to pass multiple params to that action, you need to separate each one by a pipe in the HTML.

## Links
Sometimes, maybe useful to add an anchor to an element that is no an _a_ HTML tag, just for simplicity. For that cases, the _link_ attribute can be useful, just pass the link you need inside it, removing the necessity to write the Javascript code to listen to a click and redirecting the page.
```html
<div class="card" link="https://google.com/">
    ...
</div>
```
