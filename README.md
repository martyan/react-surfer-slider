# react-surfer-slider

Photo slider component with animated caption for React

<br />
<p align="center">
    <img src="https://martinjuzl.com/react-surfer-slider.gif?v3">
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
import SurferSlider, { Slide } from 'react-surfer-slider'
import 'react-surfer-slider/dist/ReactSurferSlider.css'

<SurferSlider ratio={{width: 16, height: 9}} duration={6000}>
    <Slide caption="Every golfer loves knocking back a cold one during a round. But should you do it?">
        <a href="https://placedog.net/1024/768?id=7" target="_blank" rel="noopener noreferrer">
            <img
                src="https://placedog.net/1024/768?id=7"
                srcSet="https://placedog.net/480/360?id=7 480w, https://placedog.net/800/600?id=7 800w"
                alt="react-surfer-slider image"
            />
        </a>
    </Slide>
    <Slide caption="Tides are the rise and fall of sea levels caused by the combined effects of the gravitational forces">
        <a href="https://placedog.net/1024/768?id=118" target="_blank" rel="noopener noreferrer">
            <img
                src="https://placedog.net/1024/768?id=118"
                srcSet="https://placedog.net/480/360?id=118 480w, https://placedog.net/800/600?id=118 800w"
                alt="react-surfer-slider image"
            />
        </a>
    </Slide>
    <Slide caption="Freedom, generally, is having the ability to act or change without constraint">
        <a href="https://placedog.net/1024/768?id=140" target="_blank" rel="noopener noreferrer">
            <img
                src="https://placedog.net/1024/768?id=140"
                srcSet="https://placedog.net/480/360?id=140 480w, https://placedog.net/800/600?id=140 800w"
                alt="react-surfer-slider image"
            />
        </a>
    </Slide>
</SurferSlider>
```


### Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `duration` | `number` | `6000` | Slide duration in milliseconds |
| `ratio` | `object` | `{width: 16, height: 9}` | Slider aspect ratio |
<!--| `captionWidths` | `array` | `[{ minWidth: 0, captionWidth: 1 }, { minWidth: 420, captionWidth: .7 }]` | Responsive caption width in percentage of slider width (0 - 1) |-->

### Run examples locally

```bash
npm install
npm run dev
```
