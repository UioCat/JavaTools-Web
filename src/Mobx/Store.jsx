import { data } from "./data";
import { relocate } from '../Config/config'
import { observable, computed } from "mobx";

class storeLoad {
    constructor() {
        this.changeCode = this.changeCode();
    }

    @observable
    storeState = {
        id: '',     // 程序标识符
        base: 0x0,  // 程序的基址
        code: '',   // 二维数组
    };

    @computed
    get getStore() {
        return this.storeState;
    }

    /**
     * 更换程序，或初始化
     * @param {Number} id - 可待加载的程序标识符，类型未定
     * @returns {void} 无返回值
     */
    changeCode = (id = 0) => {
        let tmpProc = data[id];
        for (let index in tmpProc.addr) {
            tmpProc.code[index] += relocate(tmpProc.addr[index], tmpProc.base);
        }
        this.storeState.id = id;
        this.storeState.base = tmpProc.base;
        this.storeState.code = tmpProc.code;
    }

    changeBase = (base = 0x0) => {
        this.storeState.base = base;
    }
}

const storeTree = {
    storeLoad: new storeLoad(),
}

export { storeTree }