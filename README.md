# Lunar

Lunar is a library for creating incredible frontend projects in a very simple way. To use it, just add to your project the styles and the scripts inside the dist folder. A better documentation to explain all its features is coming soon.

### Creating components

You can create a component easly. First of all, to register a component we need to pass an array containing all the components we have created, to call the _lunar.register()_ method, which receives this array. Now, just create an array of components. A component is an object with two elements: its HTML, obviously, and its selector. See the example below:

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

### Hiding or showing elements

Lunar has some very useful tools to hide or show an element. It has the following utilities:

- Toggle the state of an element;
- Hide an element after it losts the focus or click outside it;
- Hide the element after moving the mouse to outside it;
- Programatically change the element state.

#### Toggle the state of an element

Sometimes we need to show an element after a click on another element and hide it after another click. We need simply to add some attributes to this purpuse:

```html
<div data-hidecontrols=".text">Toggle element</div>
<div class="text" hideable>Hello :)</div>
```

The _hideable_ atribute just tells that this element must start hidden, while the _data-hidecontrols_ tells which element will be controlled by this element. This way, a click on the first _div_ will show the second one, another click will hide. You can also put the _data-hidecontrols_ in more than one element to controlls the same one.

#### Hide an element after it losts the focus or click outside it

This may be a highly useful tool, sometimes. With this, a user can click on a button to show something, click on another and the first one will be hidden, because it simply lost the focus. Se the following example:

```html
<div hideOnClickOutside>Don't click outside me! 😾</div>
```

We can combine both the two last utilities showed until now:

```html
<div id="d" data-hidecontrols=".text">Toggle element</div>
<div class="text" hideable hideOnClickOutside>Hello :)</div>
```

#### Hide the element after moving the mouse to outside it

Sometimes is more useful to hide the element after the mouse goes away from it. For this case, there is the _hideOnMouseLeave_ attribute:

```html
<div hideOnMouseLeave>Don't forget me 😢</div>
```
As in the previous tool, we can combine it with the _data-hidecontrols_ to create a more dynamic functionality.
