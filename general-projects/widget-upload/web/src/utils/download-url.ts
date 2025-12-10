export const downloadUrl = async (url: string, filename: string) => {
	try {
		const response = await fetch(url, { mode: "cors" });
		const blob = await response.blob();

		const link = document.createElement("a");

		link.href = window.URL.createObjectURL(blob);
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.error("Error downloading file", error);
	}
};
