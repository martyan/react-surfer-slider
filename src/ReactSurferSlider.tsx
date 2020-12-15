import React, {FunctionComponent, ReactNode, useEffect, useState, useRef} from 'react'
import './SurferSlider.scss'
import classNames from "./classNames";
import Timer from "./Timer";

export type ReactSurferSliderProps = {
    items: { title: string, img: string }[]
}

function getTextWidth(text: string, font: string): number {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
    var context = canvas.getContext('2d')
    context.font = font
    var metrics = context.measureText(text)
    return metrics.width
}

const ReactSurferSlider: FunctionComponent<ReactSurferSliderProps> = ({ items }) => {

    const sliderRef = useRef<HTMLDivElement>(null)
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const [lines, setLines] = useState<string[]>([])
    const [timer, setTimer] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const activeItem = items[activeItemIndex]

    useEffect(() => {

        if(sliderRef !== null) {
            const sliderWidth = sliderRef.current!.offsetWidth
            console.log(sliderWidth)

            const wWidth = getTextWidth('w', "normal 14px 'Roboto Slab'")
            console.log(wWidth)

            const charsOnLine = Math.floor(sliderWidth / wWidth)
            // const regex = new RegExp('(?:^|\\b)[\\w .\\/]{1,' + charsOnLine + '}(?:\\b|$)', 'gi')
            const lines = activeItem.title.match(/(?:^|\b)[\w .\/]{1,36}(?:\b|$)/gi)
            setLines(lines || [])
        }
    }, [activeItemIndex])

    useEffect(() => {
        if(timer !== 0 && timer % 5 === 0) {
            setIsAnimating(true)

            setTimeout(() => {
                setIsAnimating(false)
                setActiveItemIndex(activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1)
            }, 1000)
        }
    }, [timer])

    const getNextItem = (activeItemIndex: number) => items[activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1]
    const nextItem = getNextItem(activeItemIndex)

    return (
        <>
            <div
                className={classNames(['surfer-slider', isAnimating && 'surfer-slider--before-show'])}
                ref={sliderRef}
            >
                <div className="surfer-slider__pagination">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={classNames(['surfer-slider__pagination-item', activeItemIndex === i && 'surfer-slider__pagination-item--active'])}
                            onClick={(e) => {
                                e.stopPropagation()
                                setActiveItemIndex(i)
                            }}
                        >
                            <span></span>
                        </div>
                    ))}
                </div>
                <div className="surfer-slider__img">
                    <img src={activeItem.img} alt={activeItem.title} />
                </div>
                <div className="surfer-slider__img surfer-slider__img--next">
                    <img src={nextItem.img} alt={nextItem.title} />
                </div>
                <div className="surfer-slider__title">
                    {lines.map((line, i) => (
                        <div key={i}>
                            <span>{line}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/*<Timer onChange={setTimer} />*/}
            {/*<div className="preview">w</div>*/}
            {/*<canvas ref={canvasRef}></canvas>*/}
        </>
    )

}

ReactSurferSlider.defaultProps = {
    items: []
}

export default ReactSurferSlider
