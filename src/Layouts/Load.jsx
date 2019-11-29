import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Memory } from '../Components/Memory';
import { METHOD } from "../Config/config";
import { data } from "../Config/data";
import { Paper } from '../Components/Paper';
import { Btn } from '../Components/Button';

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
                <Grid container spacing={9}>
                    <Grid item xs={7}>
                        <Paper>
                            <Memory>
                                {this.state.code}
                            </Memory>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Btn>
                                <div value="absolute"
                                    onClick={
                                        (e) => (this.setState({
                                            type: e.target.value,
                                            code: data(0x0),
                                        }))}
                                >
                                    绝对装载
                                </div>
                            </Btn>
                            <Btn>
                                <div value="reload"
                                    onClick={
                                        (e) => (this.setState({
                                            type: e.target.value,
                                            code: data(0x00400000),
                                        }))}
                                >
                                    重定位装载
                                </div>
                            </Btn>
                            <Btn>
                                <div value="dynamic"
                                    onClick={
                                        (e) => (this.setState({
                                            type: e.target.value,
                                            code: data(Number(this.state.base)),
                                        }))}
                                >
                                    动态装载
                                </div>
                            </Btn>
                            <input value={this.state.base || ''}
                                onChange={(e) => (
                                    this.setState(Object.assign({}, this.state, { base: e.target.value }))
                                )}
                                style={{ outline: 'none' }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

export { LoadApp }