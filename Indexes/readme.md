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
 *  The speed doesn't depend on the sort much
 *  because mongo can find the document from either direction
 */
db.contacts.createIndex({ 'dob.age': 1 });
```

### EXPLAINATION :

Index scans (index stage) does not return the documents. They return the pointers to the documents.
Later on, the _fetch stage_ reach out to the actual document using that pointer.

### CAVIAT

Let us say we want all the users with the ages greater than 10:

```js
// assuming indexing is still there
db.contacts.find({ 'dob.age': { $gt: 10 } });
```

_This execution will actually be slower than the one WITHOUT INDEXING_.

_WHY IS THAT?_

This is because `age > 10` covers 90% of the documents inside of the database.
So our database had to cover 90% of the indexes and returns all the pointers = pointing to their respective databases. And further, it took time to fetch those documents for us, so it actually was slow.

The point is, you should not be using indexes for the queries which return a gigantic number of documents.
_Rather, use indexes for fields which are usually unique and return less amount of documents_

## Deleting index

To delete the index:

```js
db.contacts.dropIndex({ 'dob.age': 1 });
```

_\_id field has a default indexed_

## Getting indexes

To find all the existing indexes on a collection:

```js
db.contacts.getIndexes();
```

## Creating COMPOUND INDEXES

This is used to create indexes using two fields in your collection:

```js
// can be used together or from left -> right (see examples)
db.users.createIndex({ 'dob.age': 1, gender: 1 });
```

This would create an index field something like: `33 male`.

### Examples

Query1 (good query for indexes):

```js
// order does not matter (can be different from that of index)
db.users.find({ 'dob.age': 35, gender: 'male' });
```

Query2 (also fine `left to right`):

```js
// this will also use same index
db.users.find({ 'dob.age': 35 });
```

Query3 (WRONG this won't use index)

```js
// query is right but it won't make use of index
// if you move left to right, you have to include the left ones
db.users.find({ gender: 'male' });
```

## Sorting using Indexes

In case you need large amount of data to be sorted using a specific field in the document on a regular basis, you should use indexing for that partifcular field because it helps the response time by ALOT as the db wouldn't have to sort the returned data for you. This is because indexes are already sorted.
