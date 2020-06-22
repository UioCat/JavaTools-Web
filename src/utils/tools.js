/**
 * 常用工具
 */

// ALTER
const path = {
	bin: "/bin",
};

function copy(e, that) {
	let _this = that;
	e.target.select();
	document.execCommand("Copy");
	_this.$Message.success("成功复制到剪切板");
}

export { path, copy };
