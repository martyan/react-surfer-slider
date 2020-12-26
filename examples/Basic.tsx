import React, { FunctionComponent } from 'react'
//@ts-ignore
import SurferSlider, { Slide } from 'react-surfer-slider'

const Basic: FunctionComponent = () => (
    <SurferSlider
        duration={10000}
        ratio={{width: 4, height: 3}}
        captionWidths={[
            {minWidth: 0, captionWidth: 1}
        ]}
    >
        <Slide caption="Every golfer loves knocking back a cold one during a round. But should you do it?">
            <a href="https://projectgolfau.com/can-you-drink-alcohol-on-the-golf-course/" target="_blank" rel="noopener noreferrer">
                <img
                    src="https://martinjuzl.com/react-surfer-slider/cover6.jpg"
                    srcSet="https://martinjuzl.com/react-surfer-slider/cover6_640.jpg 640w, https://martinjuzl.com/react-surfer-slider/cover6_1024.jpg 1024w"
                    alt="react-surfer-slider image"
                />
            </a>
        </Slide>
        <Slide caption="Tides are the rise and fall of sea levels caused by the combined effects of the gravitational forces">
            <a href="https://en.wikipedia.org/wiki/Tide" target="_blank" rel="noopener noreferrer">
                <img
                    src="https://martinjuzl.com/react-surfer-slider/cover5.jpg"
                    srcSet="https://martinjuzl.com/react-surfer-slider/cover5_640.jpg 640w, https://martinjuzl.com/react-surfer-slider/cover5_1024.jpg 1024w"
                    alt="react-surfer-slider image"
                />
            </a>
        </Slide>
        <Slide caption="Freedom, generally, is having the ability to act or change without constraint">
            <a href="https://en.wikipedia.org/wiki/Freedom" target="_blank" rel="noopener noreferrer">
                <img
                    src="https://martinjuzl.com/react-surfer-slider/cover4.jpg"
                    srcSet="https://martinjuzl.com/react-surfer-slider/cover4_640.jpg 640w, https://martinjuzl.com/react-surfer-slider/cover4_1024.jpg 1024w"
                    alt="react-surfer-slider image"
                />
            </a>
        </Slide>
        <Slide caption="Rychlebské stezky is network of trails which are specifically designed for enjoyable ride on mountain bike in close touch with nature">
            <a href="http://www.rychlebskestezky.cz/en" target="_blank" rel="noopener noreferrer">
                <img
                    src="https://martinjuzl.com/react-surfer-slider/cover3.jpg"
                    srcSet="https://martinjuzl.com/react-surfer-slider/cover3_640.jpg 640w, https://martinjuzl.com/react-surfer-slider/cover3_1024.jpg 1024w"
                    alt="react-surfer-slider image"
                />
            </a>
        </Slide>
        <Slide caption="Taghazout is a small fishing village north of the city of Agadir in southwestern Morocco.">
            <a href="https://en.wikipedia.org/wiki/Taghazout" target="_blank" rel="noopener noreferrer">
                <img
                    src="https://martinjuzl.com/react-surfer-slider/cover.jpg"
                    srcSet="https://martinjuzl.com/react-surfer-slider/cover_640.jpg 640w, https://martinjuzl.com/react-surfer-slider/cover_1024.jpg 1024w"
                    alt="react-surfer-slider image"
                />
            </a>
        </Slide>
    </SurferSlider>
)

export default Basic
