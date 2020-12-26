import {RefObject, useLayoutEffect, useState} from 'react'

function useSize(ref?: RefObject<HTMLElement>) {
    const [size, setSize] = useState([0, 0])

    useLayoutEffect(() => {
        function updateSize() {
            setSize([ref?.current ? ref.current.offsetWidth : window.innerWidth, window.innerHeight])
        }

        window.addEventListener('resize', updateSize)
        updateSize()

        return () => window.removeEventListener('resize', updateSize)
    }, [])

    return size
}

export default useSize
