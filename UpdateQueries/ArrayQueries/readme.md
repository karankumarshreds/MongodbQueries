Dataset:

```js
{
        "_id" : ObjectId("602d83bdda2d64cb53265b7c"),
        "name" : "Max",
        "hobbies" : [
                {
                        "title" : "Sports",
                        "frequency" : 3
                },
                {
                        "title" : "Cooking",
                        "frequency" : 6
                }
        ],
        "phone" : 131782734
},
{
        "_id" : ObjectId("602d83bdda2d64cb53265b7c"),
        "name" : "Max",
        "hobbies" : [
                {
                        "title" : "Sports",
                        "frequency" : 2
                },
                {
                        "title" : "Cooking",
                        "frequency" : 6
                }
        ],
        "phone" : 131782734
},
{
        "_id" : ObjectId("602d83bdda2d64cb53265b7c"),
        "name" : "Max",
        "hobbies" : [
                {
                        "title" : "Sports",
                        "frequency" : 6
                },
                {
                        "title" : "Cooking",
                        "frequency" : 6
                }
        ],
        "phone" : 131782734
}
```

## Update single element in an array using ==> $ <==

Find the users who's hobbies have title "Sports" _and_ that same field has frequency: _gte 3_ **AND SET THEIR FREQUENCY TO 10**

**NOTE** : _You can use $and BUT that will not query on the same field_

```js
db.users.updateMany(
  { hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } } }, // elemMatch refers to the exact field on the document
  {
    $set: {
      'hobbies.$.frequency': 10, // $ refers to the exact array element of the filtered document
    },
  }
);
```

In the same query condition above, find all the documents and change the frequency for SPORTS field to +1

```js
db.users.updateMany(
  { hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } } },
  { $inc: { 'hobbies.$.frequency': 1 } }
);
```

## Update all elements in an array using ==> $[] <==

```js
{
        "_id" : ObjectId("602d83bdda2d64cb53265b7c"), "name" : "Max",
        "hobbies" : [ { "title" : "Sports", "frequency" : 10 }, { "title" : "Cooking", "frequency" : 6 } ],
        "phone" : 131782734
}
{
        "_id" : ObjectId("602d83bdda2d64cb53265b7d"), "name" : "Anna",
        "hobbies" : [ { "title" : "Sports", "frequency" : 2 }, { "title" : "Yoga", "frequency" : 3 } ],
        "phone" : "80811987291",
        "age" : null
}
{
        "_id" : ObjectId("602d83bdda2d64cb53265b7e"), "name" : "Manuel",
        "hobbies" : [ { "title" : "Cooking", "frequency" : 5 }, { "title" : "Cars", "frequency" : 2 } ],
        "phone" : "012177972",
        "age" : 35
}
```

Find all the people who's hobbies is Sports and frequency is $gte 2 and update their frequency to +20 for all their hobbies (_for all the elements in their hobbies array_)

```js
db.users.updateMany(
  {
    'hobbies.title': 'Sports',
    'hobbies.frequency': { $gte: 2 },
  },
  {
    $inc: { 'hobbies.$[].frequency': +20 }, // $[] targets all the elements in the array
  }
);
```
