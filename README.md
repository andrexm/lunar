# Lunar

Lunar is a library for creating incredible frontend projects in a very simple way. To use it, just add the styles and the scripts inside the dist folder. A better documentation to explain all its features is coming soon.

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

dfasdf
