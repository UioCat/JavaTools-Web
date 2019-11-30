import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Memory } from '../Components/Memory';
import { Paper } from '../Components/Paper';
import { Btn } from '../Components/Button';

@inject('store')
class LoadApp extends Component {
    constructor(props) {
        super(props);
        console.log(props.store);
        // this.props.store.getCode = this.props.store.getCode.bind(this);
    }
    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={7}>
                    <Paper>
                        <Memory>
                            {console.log(this.props.store.Proc.proc)}
                        </Memory>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Btn>
                            <div onClick={this.props.changeBase(0x0)}>
                                绝对装载
                        </div>
                        </Btn>
                        <Btn>
                            <div onClick={this.props.Proc_1.changeBase(0x00400000)}>
                                重定位装载
                        </div>
                        </Btn>
                        <Btn>
                            <div onClick={this.props.Proc_1.changeBase(this.props.Proc_1.base)}>
                                动态装载
                        </div>
                        </Btn>
                        <TextField id="standard-basic" label="基地址"
                            value={this.props.Proc_1.base || ''}
                            onChange={(e) => this.props.Proc_1.changeBase(e.target.value)}
                            style={{ outline: 'none' }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export { LoadApp }