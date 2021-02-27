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

**To check the speed of your search query analysis**:

```js
db.contacts.explain('executionStats').find({ 'dob.age': { $gt: 60 } });
```

## Creating index

Let us say we need to create an index on **age**

```js
/*
 *  1    ==    ascending ordered index
 * -1    ==    descending ordered index
 * The speed doesn't depend on the sort much
 * because mongo can find the document from either direction
 */
db.contacts.createIndex({ 'dob.age': 1 });
```

**EXPLAINATION** :

Index scans (index stage) does not return the documents. They return the pointers to the documents.
Later on, the _fetch stage_ reach out to the actual document using that pointer.
