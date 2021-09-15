# Node.js Test HTTP Server

Test HTTP Server with CORS support for prototyping of simple client applications.
It provides a resource `/` that allows you store and retrieve a json object persisted in memory.

## Install and run

Install [https://nodejs.org/en/](node.js)

```
$ npm install
$ node index.js
```

## Usage

### Storing and retrieving data

```
$ curl -s http://localhost:3000/ | jq .
{}

$ curl -X PUT -Hcontent-type:application/json --data-binary '[1,2,3,4]' http://localhost:3000/ | jq .
[
  1,
  2,
  3,
  4
]

$ curl -s http://localhost:3000/ | jq .
[
  1,
  2,
  3,
  4
]
```

### Fail mode

The server can be configured in runtime in fail mode. Whenever is in this state, requests to store or retrieve data returns a 500 status code.
This is useful to simulate error flows in your clients.

#### Set fail mode

```
$ curl -s http://localhost:3000/mode | jq .
{
  "fail": false
}

$ curl -s -X PUT http://localhost:3000/mode/fail | jq .
{
  "fail": true
}

$ curl -i -X PUT -Hcontent-type:application/json --data-binary '[1,2,3,4]' http://localhost:3000/
HTTP/1.1 500 Internal Server Error
...

Internal Server Error

$ curl -i  http://localhost:3000/
HTTP/1.1 500 Internal Server Error
...

Internal Server Error
```

#### Unset fail mode

```
$ curl -s -X PUT http://localhost:3000/mode/ok | jq .
{
  "fail": false
}

$ curl -s http://localhost:3000/ | jq .
[
  1,
  2,
  3,
  4
]
```
