(() => {
    let netflixButtonBar, rating, movieTitle, movieYear, rate;

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            pageRefresh();
        }
    });

    const pageRefresh = async () => {
        if (movieTitle == document.getElementsByClassName("storyArt detail-modal has-smaller-buttons")[0].getElementsByTagName("img")[0].alt) {
            movieTitle = document.getElementsByClassName("storyArt detail-modal has-smaller-buttons")[0].getElementsByTagName("img")[0].alt;
            movieYear = document.getElementsByClassName("videoMetadata--second-line")[0].innerText.split("\n")[0];
            
            
            rating = document.getElementsByClassName("videoMetadata--first-line")[0]


            const ratingSpan = document.createElement("span");
            const ratingText = document.createTextNode(`IMDB: ${rate}`);

            ratingSpan.appendChild(ratingText);
            ratingSpan.id = "ratingElement";

            rating.append(ratingSpan);

            ratingSpan.style.color = "#46d369"
            ratingSpan.style.fontWeight = 500
            return
        }
        movieTitle = document.getElementsByClassName("storyArt detail-modal has-smaller-buttons")[0].getElementsByTagName("img")[0].alt;
        movieYear = document.getElementsByClassName("videoMetadata--second-line")[0].innerText.split("\n")[0];
        
        // console.log('Title: ', movieTitle, ' Year: ', movieYear)
        // console.log(typeof movieTitle,typeof movieYear)
        
        rating = document.getElementsByClassName("videoMetadata--first-line")[0]

        rate = await this.fetchTitleId(movieTitle)

        const ratingSpan = document.createElement("span");
        const ratingText = document.createTextNode(`IMDB: ${rate}`);

        ratingSpan.appendChild(ratingText);
        ratingSpan.id = "ratingElement";

        rating.append(ratingSpan);

        ratingSpan.style.color = "#46d369"
        ratingSpan.style.fontWeight = 500
    }

    pageRefresh();
})();




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
          console.log(result)
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
          const rating = await result["results"]["averageRating"];
      return rating
      } catch (error) {
          console.error(error);
      }
  }