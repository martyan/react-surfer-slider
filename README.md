# react-surfer-slider

Photo slider component with animated caption for React

<br />
<p align="center">
    <img src="https://martinjuzl.com/react-surfer-slider.gif">
</p>
<br />

Check <a href="https://martinjuzl.com/react-surfer-slider">examples</a>

### Installation

```bash
npm install --save react-surfer-slider
```

or

```bash
yarn add react-surfer-slider
```

### Usage

```jsx
import SurferSlider from 'react-surfer-slider'
import 'react-surfer-slider/dist/ReactSurferSlider.css'

const sliderItems = [
    {url: 'https://placedog.net/640/420', title: 'Every golfer loves knocking back a cold one during a round. But should you do it?', img: 'https://placedog.net/640/420'},
    {url: 'https://placedog.net/640/420 ', title: 'Tides are the rise and fall of sea levels caused by the combined effects of the gravitational forces', img: 'https://placedog.net/640/420'},
    {url: 'https://placedog.net/640/420 ', title: 'Freedom, generally, is having the ability to act or change without constraint', img: 'https://placedog.net/640/420'},
]

<SurferSlider
    items={sliderItems}
    duration={5000}
/>
```


### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `items` (required) | `array` | `[]` | Progress bar radius |
| `duration` | `number` | `[]` | Slide duration in milliseconds |
| `onClick` | `function` | `() => null` | Slide click handler |

### Run examples locally

```bash
npm install
npm run dev
```
