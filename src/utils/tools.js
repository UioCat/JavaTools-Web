/**
 * 常用工具
 */

import { post } from "./request";

/**
 * 提示复制成功的全局消息
 * @param {Object} e 事件对象
 * @param {Object} that this 指针
 */
function copy(e, that) {
	let _this = that;
	e.target.select();
	document.execCommand("Copy");
	_this.$Message.success("成功复制到剪切板");
}

/**
 * 在防抖的前提下实时解析代码
 * @param {String} path 路径
 * @param {Object} param 数据载荷
 * @param {Object} that this 指针
 */
function parse(path, param, that) {
	return post(path, param)
		.then((res) => {
			if (res.code === 12) {
				that.fields = res.info;
			} else {
				that.$Message.error("解析失败：" + res.message);
			}
		})
		.catch((err) => {
			that.$Message.error("发送失败");
			console.error(err);
		});
}

export { parse, copy };
