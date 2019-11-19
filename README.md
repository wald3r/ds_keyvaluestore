# ds_keyvaluestore

We developed a simple key-value store, using MongoDB, NodeJS and Kafka. Multiple instances of the application node appear as they would share a database. For example: sharing user setting values between multiple instances of a service.

## Installation

If you want to run all of them on the same machine, you can jump directly to “Run”. 

Installation ( replace <?> with 1 or 2 depending on which node you want to edit) : 

 * Update the IP addresses (all of them can be localhost if running on the same machine):
    * docker-compose-kafka.yml
      * KAFKA_ADVERTISED_HOST_NAME : IP of the node running Kafka
    * docker-compose-node<?>.yml
      * KAFKA : IP of the node running Kafka
    * frontend<?>/src/services/pair.js
      * basicUrl : IP of the node running the backend<?> for this frontend<?>

## Run

```
docker-compose --file docker-compose-kafka.yml up -d
docker-compose --file docker-compose-node1.yml up -d
docker-compose --file docker-compose-node2.yml up -d
```

OR ALTERNATIVELY to start all at once

```
docker-compose --file docker-compose-all.yml up
```
