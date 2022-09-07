# Lunar

Lunar is a library for creating incredible frontend projects in a very simple way. To use it, just add to your project the styles and the scripts inside the dist folder. Be creative.

### Creating components

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

You can also pass classes to the component you are using throught its selector using the __data-class__ attribute, but have in mind that, if your component has more than one element side by side, only the first one will receive that classes.

```html
<app-fruits data-class="p-6 mb-4 rounded-md"></app-fruits>
```

Note that you can call the _lunar.register()_ more than one time, this does not have side effects.

### Hiding or showing elements

Lunar has some very useful tools to hide or show an element. It has the following utilities:

- Toggle the state of an element;
- Hide an element after it losts the focus or a click outside it;
- Hide the element after moving the mouse to outside it;
- Programatically change the element state.

#### Toggle the state of an element

Sometimes we need to show an element after a click on another element and hide it after another click. We need simply to add some attributes to this purpuse:

```html
<div data-hidecontrols=".text">Toggle element</div>
<div class="text" hideable>Hello :)</div>
```

The _hideable_ atribute just tells that this element must start hidden, while the _data-hidecontrols_ tells which element will be controlled by this element. This way, a click on the first _div_ will show the second one, another click will hide. You can also put the _data-hidecontrols_ in more than one element to controlls the same one.

#### Hide an element after it losts the focus or a click outside it

This may be a highly useful tool, sometimes. With it, a user can click on a button to show something, click on another and the first one will be hidden, because it simply lost the focus. Se the following example:

```html
<div hideOnClickOutside>Don't click outside me! 😾</div>
```

We can combine both the two last utilities showed until now:

```html
<div data-hidecontrols=".text">Toggle element</div>
<div class="text" hideable hideOnClickOutside>Hello :)</div>
```

#### Hide the element after moving the mouse to outside it

Sometimes is more useful to hide the element after the mouse goes away from it. For this case, there is the _hideOnMouseLeave_ attribute:

```html
<div hideOnMouseLeave>Don't forget me 😢</div>
```

As in the previous tool, we can combine it with the _data-hidecontrols_ to create a more dynamic functionality.

#### Example

In this example, we have a button that shows the alert message after clicking on it. The alert message is a component that also contains another component inside it, an icon. There is two icons registered as components in this code, the first one comes from HeroIcons and the second one from Bootstrap Icons. In the HTML, the code is very clean, mainly when we need to reuse some component, like the icons of the example. Also, the alert component contains a _span_ tag, which can close the alert if clicked due to the _data-hidecontrols_ attribute with a selector pointing to the alert itself.

```html
<div class="btn-primary" data-hidecontrols="#success-msg">
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
                    <span data-hidecontrols="#success-msg">Close</span>
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
