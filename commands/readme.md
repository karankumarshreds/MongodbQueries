## Creation

To show dbs: 

```
show dbs 
```

To create a db named as ```user```: 

```
use user
```

To add collections and users to it: 

```
db.user.insertOne({ name: "karan" })
```


## Deletion

To delete a database: 

```
use user
db.dropDatabase()
```

To delete a collection: 

```
db.users.drop()
```

## Import 

```
mongoimport tv-shows.json -d movieData -c movies --jsonArray --drop
```

Where ```movieData``` is the database name, ```movies``` is the collection name and ```--drop``` tells to override the existing db/collection.
