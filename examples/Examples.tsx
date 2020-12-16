import React, { FunctionComponent } from 'react'
import Basic from './Basic'
import './Examples.scss'

const Examples: FunctionComponent = () => {

    return (
        <div className="examples">
            <div className="container">
                <div className="list">
                    <Basic />
                </div>
            </div>
        </div>
    )

}

export default Examples
