/**
 * 将可复用的工具函数抽离出来
 */

import { post } from "./request";
import { toolSet } from "./config";

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
 * @param {Object} param 数据载荷
 * @param {Object} that this 指针
 */
function parse(param, that) {
	return post(toolSet.mysql.api.parse, param)
		.then((res) => {
			if (res.code === 12) {
				that.$Message.success(`解析成功`);
				return res.info;
			} else {
				that.$Message.error(`解析失败: ${res.message}`);
			}
		})
		.catch((err) => {
			that.$Message.error("发送失败");
			console.error(err);
		});
}

/**
 * 生成代码
 * @param {String} path 路径
 * @param {Object} param 数据在和
 * @param {Object} that this 指针
 */
function generate(path, param, that) {
	return post(path, param)
		.then((res) => {
			if (res.code === 12) {
				return res.info;
			} else {
				that.$Message.error(`操作失败: ${res.message}`);
			}
		})
		.catch((err) => {
			that.$Message.error("发送失败");
			console.error(err);
		});
}

export { parse, copy, generate };
