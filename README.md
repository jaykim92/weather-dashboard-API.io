# weather-dashboard-API.io

## Description
This application pulls data from a weather API to display the current weather and the 5 day forecast. It displays a history of searches during your session that you can click on to view the weather of that area once more. Upon refreshing the page, only the last search result will be displayed.

## Challenges
There were many points along the development and building of this app that had me stumped. While trying to make my code stop running upon pressing enter with an empty entry, I learned that without preventdefault() on my form, nothing would submit properly. Even with further research however, I am still unsure of why it works with the addition of that line and why it doesn't work without it. For a while, my code was creating a set of five additional cards that showed the 5 day forecast so I had to figure out a way to delete the cards before making new ones. This required a bit of restructuring the DOM elements.

Something that I did not have time to implement was an alert that shows the user that a location they entered in the search bar does not return any results from the API. I will have to look into sucess() for ajax when a result doesn't come back successfully.