# Sample twitter application to search for a #hastag.


## How to Install

* Download or clone the git repository.
* Install dependencies: `npm install`
* Replace credentials for Twitter API (configured in `server\config.js`)
* Make the build: `npm run build`
* And start the app: `node server`
* View in browser at: `http://localhost:9000`

## How to Search

* In the browser, the search area is displayed.
* Enter the hastag that you want to search, and click `Enter`.
* All the tweets having this hashtag will be streamed.
* For next hashtag search, clear the current text and write the new hashtag.
* Click `Enter`. And stream the tweets.