import React, { Component } from 'react'
import { Memory } from '../Components/Memory'
import { METHOD } from "../Config/config"
import { data } from "../Config/data"

class LoadApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: METHOD[0],
            base: 0x0,
            code: data(0x0),
        }
    }

    render() {
        return (
            <div>
                <Memory>
                    {this.state.code}
                </Memory>

                <div>
                    <div value="absolute"
                        onClick={
                            (e) => (this.setState({
                                type: e.target.value,
                                code: data(0x0),
                            }))}
                    >
                        绝对装载
                    </div>
                    <div value="reload"
                        onClick={
                            (e) => (this.setState({
                                type: e.target.value,
                                code: data(0x00400000),
                            }))}
                    >
                        重定位装载
                    </div>
                    <div value="dynamic"
                        onClick={
                            (e) => (this.setState({
                                type: e.target.value,
                                code: data(Number(this.state.base)),
                            }))}
                    >
                        动态装载
                    </div>
                    <input value={this.state.base || ''}
                        onChange={(e) => (
                            this.setState(Object.assign({}, this.state, { base: e.target.value }))
                        )}
                    />
                </div>
            </div >
        )
    }
}

export { LoadApp }