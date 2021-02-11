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
