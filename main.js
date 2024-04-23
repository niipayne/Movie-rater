async function fetchTitleId(title) {
	const url =
		"https://moviesdatabase.p.rapidapi.com/titles/search/title/" +
		title +
		"?exact=true&titleType=movie";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "f48f88e387msh1acb1e8f0e13e05p14cf08jsn58146eac4470",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};
	let id;
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		id = result["results"]["0"]["id"];
		Promise.toString(id);
	} catch (error) {
		console.error(error);
	}

	const url2 =
		"https://moviesdatabase.p.rapidapi.com/titles/" + id + "/ratings";
	const options2 = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "f48f88e387msh1acb1e8f0e13e05p14cf08jsn58146eac4470",
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
		},
	};

	try {
		const response = await fetch(url2, options2);
		const result = await response.json();
		console.log(title + " IMDb rating " + result["results"]["averageRating"]);
	} catch (error) {
		console.error(error);
	}
}

document.addEventListener("keydown", function (e) {
	if (e.key == "Enter") {
		let input = document.getElementById("input").value;
		fetchTitleId(input);
	}
});
