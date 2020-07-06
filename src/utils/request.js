/**
 * 处理请求
 */

// 路径
const BASE = {
	prod: "https://www.uiofield.top/tools/",
	test: "http://localhost/tools/",
};

// 基础配置
const headers = new Headers({
	Accept: "application/json",
	"Content-Type": "application/json",
	mode: "cors",
});

/**
 * 处理响应，格式化 JSON
 * @param {Object} response 响应体
 */
const handleResponse = (response) => {
	if (response.status < 500) {
		return response.json();
	} else {
		// 服务器或网络错误
		console.error(`Request failed. Message = ${response.statusText}`);
		return { error: { msg: "Server error." } };
	}
};

/**
 * 发送请求
 * @param {String} path 路径
 * @param {Object} data 对象信息
 */
const post = (path, data) =>
	fetch(BASE.prod + path, {
		method: "POST",
		body: JSON.stringify(data),
		credentials: "include",
		headers: headers,
	})
		.then((response) => handleResponse(response))
		.catch((err) => {
			// 客户端网络错误
			console.error(`Request failed. Message = ${err}`);
			return { error: { msg: "Request failed." } };
		});

export { post };
