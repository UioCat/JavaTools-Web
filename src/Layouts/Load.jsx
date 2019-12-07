import React, { Component } from 'react';
import { inject } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { addrFix, METHOD } from "../Config/config";
import { Memory } from '../Components/Memory';
import { Paper } from '../Components/Paper';
import { Btn } from '../Components/Button';

@inject('store')
class LoadApp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Grid container spacing={5}>
                <Grid item xs={7}>
                    <Paper>
                        <Memory>
                            {
                                console.log(this.props.store.storeLoad.storeState.code)
                            }
                        </Memory>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Chip
                            label={"代码基地址：" + addrFix(this.props.store.storeLoad.storeState.base_code)}
                            color="primary"
                            variant="outlined"
                        />
                        <Chip
                            label={"进程基地址：" + addrFix(this.props.store.storeLoad.storeState.base_proc)}
                            color="primary"
                            variant="outlined"
                        />
                        <Chip
                            label={"当前使用：" + this.props.store.storeLoad.storeState.stat_type}
                            color="primary"
                            variant="outlined"
                        />
                    </Paper>
                    <Paper>
                        <Btn>
                            <div onClick={this.props.store.storeLoad.changeMethod(METHOD[0])}>
                                绝对装载
                            </div>
                        </Btn>
                        <Btn>
                            <div onClick={this.props.store.storeLoad.changeMethod(METHOD[1])}>
                                重定位装载
                            </div>
                        </Btn>
                        <Btn>
                            <div onClick={this.props.store.storeLoad.changeMethod(METHOD[3])}>
                                动态装载
                            </div>
                        </Btn>
                        <TextField id="standard-basic" label="基地址"
                            value={this.props.store.storeLoad.storeState.base_input || ''}
                            onChange={(e) => this.props.store.storeLoad.storeState.changeBase(e.target.value)}
                            style={{ outline: 'none' }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export { LoadApp }