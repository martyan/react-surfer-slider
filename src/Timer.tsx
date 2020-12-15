import React, { FunctionComponent, useState, useEffect } from 'react'

interface TimerProps {
    onChange?: (value: number) => void
}

const Timer: FunctionComponent<TimerProps> = ({ onChange }) => {

    const [ elapsed, setElapsed ] = useState(0)
    const [ intervalId, setIntervalId ] = useState<number | undefined>()

    useEffect(() => {
        start(intervalId)

        return () => clear(intervalId)
    }, [])

    useEffect(() => {
        onChange?.(elapsed)
    }, [elapsed])

    const start = (intervalId: number | undefined) => {
        clear(intervalId)

        const newIntervalId = window.setInterval(() => {
            setElapsed(elapsed => elapsed + 1)
            setIntervalId(newIntervalId)
        }, 1000)
    }

    const clear = (intervalId: number | undefined) => {
        if(intervalId !== undefined) {
            window.clearInterval(intervalId)
        }
    }

    return null

}

export default Timer
