# ds_keyvaluestore

## Running

```
docker-compose up
```

```
npm install
```

```
node index.js
```

It will send one message, and read all messages sent so far. So at every restart you should see more messages.

Run `docker-compose stop` to shut down the kafka server

We will need to modify the kafka host name to make it really distributed
