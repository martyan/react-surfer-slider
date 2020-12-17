import React, { FunctionComponent } from 'react'
//@ts-ignore
import SurferSlider from 'react-surfer-slider'

const sliderItems = [
    {url: 'https://projectgolfau.com/can-you-drink-alcohol-on-the-golf-course/', title: 'Every golfer loves knocking back a cold one during a round. But should you do it?', img: 'https://firebasestorage.googleapis.com/v0/b/old-felony.appspot.com/o/covers%2Fcover6.jpg?alt=media'},
    {url: 'https://en.wikipedia.org/wiki/Tide', title: 'Tides are the rise and fall of sea levels caused by the combined effects of the gravitational forces', img: 'https://firebasestorage.googleapis.com/v0/b/old-felony.appspot.com/o/covers%2Fcover5.jpg?alt=media'},
    {url: 'https://en.wikipedia.org/wiki/Freedom', title: 'Freedom, generally, is having the ability to act or change without constraint', img: 'https://firebasestorage.googleapis.com/v0/b/old-felony.appspot.com/o/covers%2Fcover4.jpg?alt=media'},
    {url: 'http://www.rychlebskestezky.cz/en', title: 'Rychlebské stezky is network of trails which are specifically designed for enjoyable ride on mountain bike in close touch with nature', img: 'https://firebasestorage.googleapis.com/v0/b/old-felony.appspot.com/o/covers%2Fcover3.jpg?alt=media'},
    {url: 'https://en.wikipedia.org/wiki/Taghazout', title: 'Taghazout is a small fishing village north of the city of Agadir in southwestern Morocco.', img: 'https://firebasestorage.googleapis.com/v0/b/old-felony.appspot.com/o/covers%2Fcover.jpg?alt=media'},
]

const Basic: FunctionComponent = () => (
    <div style={{maxWidth: 640}}>
        <SurferSlider
            items={sliderItems}
            fontFamily="Roboto Slab"
            fontSizes={[
                { minWidth: 0, fontSize: 16 },
                { minWidth: 480, fontSize: 18 },
                { minWidth: 640, fontSize: 22 },
                { minWidth: 860, fontSize: 24 }
            ]}
            captionWidths={[
                { minWidth: 0, captionWidth: .7 },
                { minWidth: 640, captionWidth: .5 },
                // { minWidth: 420, captionWidth: .9 }
            ]}
            onClick={(item) => window.open(item.url, '_blank')}
        />
    </div>
)

export default Basic
