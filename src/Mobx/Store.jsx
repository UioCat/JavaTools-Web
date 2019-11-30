import { process_1 } from "./data";
import { relocate } from '../Config/config'
import { observable, computed } from "mobx";

class storeTree {
    constructor(proc, base = 0x0) {
        this.Proc = new proc();
        this.Base = this.Proc.base || base;
        for (let index in this.Proc.addr) {
            this.Proc.proc[index] += relocate(this.Proc.addr[index], this.Base)
        }
    }

    getCode() {
        return this.Proc
    }
}

const store = new storeTree(process_1)

export { store }