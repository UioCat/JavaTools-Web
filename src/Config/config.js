const METHOD = ["absolute", "reload", "dynamic"];

/**
 * JS 数值计算默认返回十进制, 需补前缀 ` 0x`，并八位对齐
 * @param {Number} addr - 待变换的地址
 * @param {Number} offset - 偏移地址
 */
const relocate = (addr, offset) => {
    let new_addr = ' 0x'
    new_addr += String((addr + offset).toString(16)).padStart(8, '0')
    return new_addr
};

export { METHOD, relocate }