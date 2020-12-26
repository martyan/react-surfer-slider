import React, {FunctionComponent, ReactNode} from 'react'

type SlideProps = {
    caption: string,
    children: ReactNode
}

const Slide: FunctionComponent<SlideProps> = ({ caption, children }) => {
    return <>{children}</>
}

export default Slide
