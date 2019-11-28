import React from 'react'
import './Memory.less'

let id = 0;
const Memory = (props) => {
    let array = props['children']

    const Li = array.map((data) => (
        data.map((ins) => (
            <li key={id++} className="styleGrid">
                {ins}
            </li>
        ))
    ))

    return (
        <div className="styleBox">
            <ul>{Li}</ul>
        </div>
    )
}

export { Memory }