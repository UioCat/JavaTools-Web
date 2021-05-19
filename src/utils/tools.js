/**
 * 将可复用的工具函数抽离出来
 */

import { post } from "./request";

/**
 * 提示复制成功的全局消息
 * @param {Object} e 事件对象
 * @param {Object} that this 指针
 */
function copy(e, that) {
	if (e.target.value) {
		let _this = that;
		e.target.select();
		document.execCommand("Copy");
		_this.$Message.success("成功复制到剪切板");
	}
}

/**
 * 解析和生成代码
 * @param {String} path 路径
 * @param {Object} param 数据在和
 * @param {Object} that this 指针
 * @param {String} msg 操作结束的提示信息
 */
function generate(path, param, that, msg = "操作") {
	return post(path, param)
		.then((res) => {
			if (res.code === 12) {
				that.$Message.success(`${msg}成功`);
			} else {
				that.$Message.error(`${msg}失败: ${res.message}`);
			}
			return res.info;
		})
		.catch((err) => {
			that.$Message.error("发送失败");
			console.error(err);
		});
}

export { copy, generate };
