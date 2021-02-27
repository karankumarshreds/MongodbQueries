# Indexing

```js
{
        "_id" : ObjectId("603a87095854104ef6c86425"),
        "gender" : "female",
        "name" : {
                "title" : "ms",
                "first" : "kelya",
                "last" : "philippe"
        },
        "location" : {
                "street" : "3688 quai chauveau",
                "city" : "avignon",
                "state" : "aisne",
                "postcode" : 47002,
                "coordinates" : {
                        "latitude" : "2.4082",
                        "longitude" : "153.9632"
                },
                "timezone" : {
                        "offset" : "+4:00",
                        "description" : "Abu Dhabi, Muscat, Baku, Tbilisi"
                }
        },
        "dob" : {
                "date" : "1950-08-05T15:04:26Z",
                "age" : 68
        }
}
```

## Creating index

Let us say we need to create an index on **age**

```js
db.contacts.createIndex({ "dob.age" })
```
