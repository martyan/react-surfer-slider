import React, {FunctionComponent, MouseEvent, useEffect, useState, useRef} from 'react'
import './ReactSurferSlider.scss'

export type ReactSurferSliderItemProps = {
    title: string,
    img: string,
    url: string
}

export type ReactSurferSliderProps = {
    items: Array<ReactSurferSliderItemProps>,
    fontFamily: string,
    fontSizes: { minWidth: number, fontSize: number }[],
    captionWidths: { minWidth: number, captionWidth: number }[],
    onClick?: (item: ReactSurferSliderItemProps) => void
}

type ClassNames = Array<string | false>
const classNames = (classNames: ClassNames): string => classNames.filter(Boolean).join(' ')

function getTextWidth(text: string, fontFamily: string): number {
    // re-use canvas object for better performance
    let canvas = (getTextWidth as any).canvas || ((getTextWidth as any).canvas = document.createElement('canvas'))
    let context = canvas.getContext('2d')
    context.font = fontFamily
    let metrics = context.measureText(text)
    return Math.ceil(metrics.width)
}

const ReactSurferSlider: FunctionComponent<ReactSurferSliderProps> = ({ items, fontFamily, fontSizes, captionWidths, onClick }) => {

    const sliderRef = useRef<HTMLDivElement>(null)
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

    const getCurrentFontSize = () => {
        if(sliderRef.current === null) return fontSizes[0].fontSize
        const sliderWidth = sliderRef.current!.offsetWidth
        const current = [...fontSizes].reverse().find(size => size.minWidth < sliderWidth)
        return current ? current.fontSize : fontSizes[0].fontSize
    }

    const getLines = (activeItemIndex: number, maxWidth: number) => {
        const activeItem = items[activeItemIndex]

        let lines = []
        let words = activeItem.title.split(' ')
        while(words.length !== 0) {
            let lineWidth = 0
            let wordCount = 0
            while(lineWidth < maxWidth) {
                if(wordCount + 1 > words.length) break
                const part = words.slice(0, wordCount + 1).join(' ')
                lineWidth = getTextWidth(part, `normal ${getCurrentFontSize()}px '${fontFamily}'`)
                if(lineWidth > maxWidth) break
                wordCount++
                // console.log(part, getCurrentCaptionWidth(), lineWidth, maxWidth, `normal ${getCurrentFontSize()}px '${fontFamily}'`)
            }
            lines.push(words.slice(0, wordCount).join(' '))
            words = words.slice(wordCount)
        }

        return lines
    }

    useEffect(() => {
        if(sliderRef !== null) {
            const sliderWidth = sliderRef.current!.offsetWidth
            const maxWidth = sliderWidth * getCurrentCaptionWidth() - 44
            const lines = getLines(activeItemIndex, maxWidth)
            setLines(lines)
            setTimeoutElapsed(0)
        }

        initTimeout()
    }, [activeItemIndex])

    const resetTimeout = () => {
        if(timeoutId) {
            window.clearTimeout(timeoutId)
            setTimeoutId(undefined)
        }
    }

    const initTimeout = (forcedActiveItemIndex?: number, elapsedTime: number = 0) => {
        resetTimeout()

        setTimeoutTimestamp(new Date().getTime())

        const timeout = setTimeout(() => {
            setIsAnimating(true)

            setTimeout(() => {
                setIsAnimating(false)
                setActiveItemIndex(forcedActiveItemIndex !== undefined ? forcedActiveItemIndex : (activeItemIndex === items.length - 1 ? 0 : activeItemIndex + 1))
            }, 1000)
        }, forcedActiveItemIndex !== undefined ? 0 : 5000 - elapsedTime)
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
            onClick={() => {
                onClick?.(activeItem)
            }}
        >
            <div className="RSS__pagination">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={classNames(['RSS__pagination-item', activeItemIndex === i && 'RSS__pagination-item--active'])}
                        onClick={(e) => handlePaginationItemClick(e, i)}
                    >
                        <span></span>
                    </div>
                ))}
            </div>
            <div className="RSS__img">
                <img src={activeItem.img} alt={activeItem.title} />
            </div>
            <div className="RSS__img RSS__img--next">
                <img src={nextItem.img} alt={nextItem.title} />
            </div>
            <div className="RSS__title" style={{fontFamily, fontSize: getCurrentFontSize()}}>
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
    fontFamily: 'Arial',
    fontSizes: [
        { minWidth: 0, fontSize: 16 },
        { minWidth: 480, fontSize: 18 },
    ],
    captionWidths: [
        { minWidth: 0, captionWidth: 1 },
        { minWidth: 420, captionWidth: .7 }
    ],
    onClick: () => null
}

export default ReactSurferSlider
