const headers = new Headers({
	"Content-Type": "application/json",
});

export const get = (path: string) => {
	return fetch(path, {
		method: "GET",
		mode: "cors",
		credentials: "include",
		headers,
	});
};

export const post = (path: string, data: object) => {
	return fetch(path, {
		method: "POST",
		mode: "cors",
		credentials: "include",
		headers,
		body: JSON.stringify(data),
	});
};
