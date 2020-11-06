# react-redux-study-app

## App Backend ./server

## App React based front ./client

$ git push heroku yourbranch:master
$ heroku config:set HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)
