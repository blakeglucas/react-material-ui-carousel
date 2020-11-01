# React Material UI Carousel

## Fork Changes

 - Added cross-fade and cross-slide functionality instead of the elements disappearing and re-rendering.
 - Added a `renderIndicator` prop that can be used to render a custom indicator instead of the default bullets.

## Description

A Generic, extendible Carousel UI component for React using [Material UI](https://material-ui.com/)  
It switches between given children using a smooth animation.  
Provides next and previous buttons.
Also provides interactible bullet indicators.

## Live Demo

Take a look at this interactible [Live Demo](https://learus.github.io/react-material-ui-carousel)

## Installation

```shell
npm install react-material-ui-carousel --save
```

**Note:**

You will need to have `material-ui` installed, in order to use this library/component

```shell
npm install @material-ui/core
npm install @material-ui/icons
```

## Usage Example

```jsx
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'

function Example(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
```

## Next & Prev Usage

```jsx
    <Carousel
        next={ (next, active) => console.log(`we left ${active}, and are now at ${next}`); }
        prev={ (prev, active) => console.log(`we left ${active}, and are now at ${prev}`); }
    >
        {...}
    </Carousel>

    // OR

    <Carousel
        next={ () => {/* Do stuff */} }
        prev={ () => {/* Do other stuff */} }
    >
        {...}
    </Carousel>

    // And so on...
```

Note: `onChange` works in a similar fashion. See [Props](#props) below.

## Props

| Prop name                 | Type                                                               | Default     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| className                 | `string`                                                           | ""          | Defines custom class name(s), that will be **added** to Carousel element                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| autoPlay                  | `boolean`                                                          | `true`      | Defines if the component will auto scroll between children                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| interval                  | `number`                                                           | `4000`      | Defines the interval in **ms** between active child changes (autoPlay)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| indicators                | `boolean`                                                          | `true`      | Defines the existence of bullet indicators                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| animation                 | `"fade"  \| "slide"`                                               | `"fade"`    | Defines the animation style of the Carousel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| timeout                   | `number  \| {appear? number, enter?: number, exit?: number}`       | `500`       | Defines the duration of the animation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| navButtonsAlwaysVisible   | `boolean`                                                          | `false`     | Defines if the next/previous buttons will always be visible or not                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| navButtonsAlwaysInvisible | `boolean`                                                          | `false`     | Defines if the next/previous buttons will always be invisible or not                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| fullHeightHover           | `boolean`                                                          | `true`      | Defines if the the next/previous button wrappers will cover the full **height** of the Item element and show buttons on full height hover                                                                                                                                                                                                                                                                                                                                                                                      |
| index                     | `number`                                                           | `0`         | Defines which child (assuming there are more than 1 children) will be displayed. Next and Previous Buttons as well as Indicators will work normally after the first render. When this prop is updated the carousel will display the chosen child. *Use this prop to programmatically set the active child*. If (index > children.length) then if (strictIndexing) index = last element. index                                                                                                                                  |
| strictIndexing            | `boolean`                                                          | `true`      | Defines whether index can be bigger than children length                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| indicatorProps            | `{className: string, style: React.CSSProperties}`                  | `undefined` | Used to customize the **non-active** indicators                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| activeIndicatorProps      | `{className: string, style: React.CSSProperties}`                  | `undefined` | Used to customize the **active** indicator                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| indicatorContainerProps   | `{className: string, style: React.CSSProperties}`                  | `undefined` | Used to customize the indicators container/wrapper                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| onChange                  | `(index: number, active: number) => void` (internally: `Function`) | `() => {}`  | Function that is called **after** internal `setActive()` method. The `setActive()` method is called when the next and previous buttons are pressed, when an indicator is pressed, or when the `index` prop changes. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed**. Will be called in conjunction with and **after** `next` and `prev` props if defined. It will not get called in first render, except if `changeOnFirstRender` is defined |
| changeOnFirstRender       | `boolean`                                                          | `false`     | Defines if `onChange` prop will be called when the carousel renders for the first time. In `componentDidMount`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| next                      | `(next: number, active: number) => void` (internally: `Function`)  | `() => {}`  | Function that is called **after** internal `next()` method. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed**                                                                                                                                                                                                                                                                                                                                  |
| prev                      | `(prev: number, active: number) => void` (internally: `Function`)  | `() => {}`  | Function that is called **after** internal `prev()` method. First argument is the child **we are going to display**, while the second argument is the child **that was previously displayed**                                                                                                                                                                                                                                                                                                                                  |
| renderIndicator           | `(index: number, props: RenderIndicatorProps)`                     | `Function`   | Function to override indicator rendering and provide custom indicators. Default value is the internal function that renders the bullet indicators. This can be used to change the dots to rectangles or any other icon.

## License

The MIT License.

## Author

[Learus](learus.github.io)
