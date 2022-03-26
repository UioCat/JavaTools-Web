export const formatTime = (time: Date) =>
	`${time.getFullYear()}-${
		time.getMonth() + 1
	}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;

export const getRandomColor = () => {
	var letters = "0123456789ABCDEF".split("");
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};
