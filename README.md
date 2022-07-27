# instakartApi

Before starting api make sure to install node modules with the help of _npm i_ command.

then start api with the help of _npm start_ or _node ._ commands.

# uses

for fetching all orders goto _/orders_ route.

for fetching order between date range add query _?from=mm-dd-yyyy&end=mm-dd-yyyy_

_(ex: http://localhost:5000/orders?from=01-12-2022&to=07-25-2022)_ in front of _/orders route_

after fetching orders simply copy the json response and make one post request to _/orders_ route with that copied json response in body. this request will save this orders into _/dummy database_ and return the response with scrapped orders json.
