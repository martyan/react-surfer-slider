import React, {FunctionComponent, MouseEvent, useEffect, useState, useRef} from 'react'
import './ReactSurferSlider.scss'

export type ReactSurferSliderItemProps = {
    title: string,
    img: string,
    url: string
}

export type ReactSurferSliderProps = {
    items: Array<ReactSurferSliderItemProps>,
    onClick: (item: ReactSurferSliderItemProps) => void,
    duration: number,
    captionWidths: { minWidth: number, captionWidth: number }[]
}

type ClassNames = Array<string | false>
const classNames = (classNames: ClassNames): string => classNames.filter(Boolean).join(' ')

function getTextWidth(text: string, font: string): number {
    // re-use canvas object for better performance
    let canvas = (getTextWidth as any).canvas || ((getTextWidth as any).canvas = document.createElement('canvas'))
    let context = canvas.getContext('2d')
    context.font = font
    let metrics = context.measureText(text)
    return Math.ceil(metrics.width)
}

const ReactSurferSlider: FunctionComponent<ReactSurferSliderProps> = ({ items, onClick, duration, captionWidths }) => {

    const sliderRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const [fontsInited, setFontsInited] = useState(false)

    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const [lines, setLines] = useState<string[]>([])
    const [isAnimating, setIsAnimating] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const [timeoutId, setTimeoutId] = useState<number | undefined>()
    const [timeoutTimeStamp, setTimeoutTimestamp] = useState(0)
    const [timeoutElapsed, setTimeoutElapsed] = useState(0)

    const activeItem = items[activeItemIndex]

    const getCurrentCaptionWidth = () => {
        if(sliderRef.current === null) return captionWidths[0].captionWidth
        const sliderWidth = sliderRef.current!.offsetWidth
        const current = [...captionWidths].reverse().find(size => size.minWidth < sliderWidth)
        return current ? current.captionWidth : captionWidths[0].captionWidth
    }

    const getLines = (text: string, font: string, maxWidth: number) => {
        let lines = []
        let words = text.split(' ')
        while(words.length !== 0) {
            let lineWidth = 0
            let wordCount = 0

            while(lineWidth < maxWidth) {
                if(wordCount + 1 > words.length) break
                const part = words.slice(0, wordCount + 1).join(' ')
                lineWidth = getTextWidth(part, font)
                if(lineWidth > maxWidth) break
                wordCount++
                // console.log(part, getCurrentCaptionWidth(), lineWidth, maxWidth, font)
            }

            lines.push(words.slice(0, wordCount).join(' '))
            words = words.slice(wordCount)
        }

        return lines
    }

    useEffect(() => {
        document.fonts.ready.then(() => {
            setFontsInited(true)
        });
    }, [])

    useEffect(() => {
        if(fontsInited) {
            if(titleRef.current !== null && sliderRef.current !== null) {
                const fontSize = window.getComputedStyle(titleRef.current).getPropertyValue('font-size')
                const fontFamily = window.getComputedStyle(titleRef.current).getPropertyValue('font-family').split(',')[0].replaceAll(`"`, ``)
                const fontStyle = window.getComputedStyle(titleRef.current).getPropertyValue('font-style')

                const sliderWidth = sliderRef.current!.offsetWidth
                const maxWidth = sliderWidth * getCurrentCaptionWidth() - 44
                const lines = getLines(items[activeItemIndex].title, `${fontStyle} ${fontSize} ${fontFamily}`, maxWidth)

                setLines(lines)
                setTimeoutElapsed(0)
            }

            initTimeout()
        }
    }, [activeItemIndex, fontsInited])

    const resetTimeout = () => {
        if(timeoutId) {
            window.clearTimeout(timeoutId)
            setTimeoutId(undefined)
        }
    }

    const initTimeout = (forcedActiveItemIndex?: number, elapsedTime: number = 0) => {
        resetTimeout()

        setTimeoutTimestamp(new Date().getTime())

        const timeout = window.setTimeout(() => {
            setIsAnimating(true)

            window.setTimeout(() => {
                setIsAnimating(false)
                setActiveItemIndex(forcedActiveItemIndex !== undefined ? forcedActiveItemIndex : (activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1))
            }, 1000)
        }, forcedActiveItemIndex !== undefined ? 0 : duration - elapsedTime)
        setTimeoutId(timeout)
    }

    const handlePaginationItemClick = (e: MouseEvent, i: number) => {
        e.stopPropagation()

        initTimeout(i)
    }

    const getNextItem = (activeItemIndex: number) => items[activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1]
    const nextItem = getNextItem(activeItemIndex)

    return (
        <div
            className={classNames(['RSS', isAnimating && 'RSS--before-show', mouseOver && 'RSS--mouse-over'])}
            ref={sliderRef}
            onMouseEnter={() => {
                resetTimeout()
                const deltaTime = new Date().getTime() - timeoutTimeStamp
                setTimeoutElapsed(timeoutElapsed + deltaTime)
                setMouseOver(true)
            }}
            onMouseLeave={() => {
                initTimeout(undefined, timeoutElapsed)
                setMouseOver(false)
            }}
            onClick={() => onClick(activeItem)}
        >
            <div className="RSS__pagination">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={classNames(['RSS__pagination-item', activeItemIndex === i && 'RSS__pagination-item--active'])}
                        onClick={(e) => handlePaginationItemClick(e, i)}
                    >
                        <span className="RSS__pagination-track"></span>
                        <span className="RSS__pagination-progress" style={{animationDuration: `${duration}ms`}}></span>
                    </div>
                ))}
            </div>
            <div className="RSS__img">
                <img src={activeItem.img} alt={activeItem.title} style={{animationDuration: `${duration}ms`}} />
            </div>
            <div className="RSS__img RSS__img--next">
                <img src={nextItem.img} alt={nextItem.title} />
            </div>
            <div className="RSS__title" ref={titleRef}>
                {lines.map((line, i) => (
                    <div key={i}>
                        <span>{line}</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

ReactSurferSlider.defaultProps = {
    items: [],
    duration: 6000,
    onClick: () => null,
    captionWidths: [
        { minWidth: 0, captionWidth: 1 },
        { minWidth: 420, captionWidth: .7 }
    ]
}

export default ReactSurferSlider
