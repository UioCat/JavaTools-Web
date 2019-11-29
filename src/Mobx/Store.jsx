import { process_1, process_2 } from "./data";

class Store {
    constructor() {
        this.Proc_1 = new process_1();
        this.Proc_2 = new process_2();
    }
}

const storeTree = new Store()

export { storeTree }