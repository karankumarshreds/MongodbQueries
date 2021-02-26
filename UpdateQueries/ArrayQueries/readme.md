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

## Update single element(FIRST MATCH) in an array using ==> $ <==

Find the users who's hobbies have title "Sports" _and_ that same field has frequency: _gte 3_ **AND SET THEIR FREQUENCY TO 10**

**NOTE** : _You can use $and BUT that will not query on the same field_

```js
db.users.updateMany(
  { hobbies: { $elemMatch: { title: 'Sports', frequency: { $gte: 3 } } } }, // elemMatch refers to the exact field on the document
  {
    $set: {
      'hobbies.$.frequency': 10, // $ refers to the exact(FIRST MATCHED ELEMENT) array element of the filtered document
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

## Update multiple elements in an array using ==> $[el] <==

Find all the people who's hobbies frequency are greater than 2 (NOTE: it may also return docs/people who have some hobbies who's frequency is less than 2 ). Now update all their hobbies frequencies who's frequency is greater than 3 to +10.

**Note**: The idea is to find docs with frequencies > 2 and update only those elements. You cannot use $ because it only updates first matched element and neither $[] as it updates all.

**dataset**

```js
{
        "_id" : ObjectId("6036953aec9d2a3612452bae"), "name" : "Max",
        "hobbies" : [{ "title" : "Sports", "frequency" : 10 }, { "title" : "Cooking", "frequency" : 6 }],
        "phone" : 131782734
}
{
        "_id" : ObjectId("6036953aec9d2a3612452baf"), "name" : "Manuel",
        "hobbies" : [{ "title" : "Cooking", "frequency" : 5 }, { "title" : "Cars", "frequency" : 2 }],
        "phone" : "012177972",
}
{
        "_id" : ObjectId("6036953aec9d2a3612452bb0"), "name" : "Anna",
        "hobbies" : [{ "title" : "Sports", "frequency" : 10 }, { "title" : "Yoga", "frequency" : 12 }],
        "phone" : "80811987291",
}
```

**This will take 3 arguments**

```js
db.updateMany(
  { 'hobbies.frequency': { $gt: 2 } }, // filter
  { $inc: { 'hobbies.$[el].frequency': +10 } }, // setting the values (not saving yet)
  { arrayFilters: [{ 'el.frequency': { $gt: 2 } }] } // setting it(condition) on particular elements inside the array
);
```

**updated to**

```js
{
        "_id" : ObjectId("6036953aec9d2a3612452bae"), "name" : "Max",
        "hobbies" : [{ "title" : "Sports", "frequency" : 20 }, { "title" : "Cooking", "frequency" : 16 }],
        "phone" : 131782734
}
{
        "_id" : ObjectId("6036953aec9d2a3612452baf"), "name" : "Manuel",
        "hobbies" : [{ "title" : "Cooking", "frequency" : 15 }, { "title" : "Cars", "frequency" : 2 }],
        "phone" : "012177972",
}
{
        "_id" : ObjectId("6036953aec9d2a3612452bb0"), "name" : "Anna",
        "hobbies" : [{ "title" : "Sports", "frequency" : 20 }, { "title" : "Yoga", "frequency" : 22 }],
        "phone" : "80811987291",
}
```

## Add element to an array field inside the document using ==> $push <==

Find the person with name Max and add another hobby to its hobby array field

```js
db.users.updateOne({ name: 'Max' }, { $push: { hobbies: { title: 'Swimming', frequency: 3 } } });
```

## Add multiple elements to array field inside the document using => $push w/ $each <==

Find the person with name Max and add two hobbies to the hobbies array field

```js
db.users.updateOne(
  { name: 'Max' },
  {
    $push: {
      hobbies: {
        $each: [
          { title: 'Swimming', frequency: 3 },
          { title: 'Hiking', frequency: 5 },
        ],
      },
    },
  }
);
```

You can add **$sort** to sort the entire array whilst pushing an element to it:

```js
db.users.updateOne(
  { name: 'Max' },
  {
    $push: {
      hobbies: {
        $each: [
          { title: 'Swimming', frequency: 3 },
          { title: 'Hiking', frequency: 5 },
        ],
        $sort: { frequency: -1 },
      },
    },
  }
);
```

## Remove element from the array field inside the document using ==> $pull <==

Remove the Hiking hobby from the array field

```js
db.users.updateOne(
  { name: 'Max' },
  {
    $pull: { hobbies: { title: 'Hiking' } },
  }
);
```

**NOTE** : You cannot use `$pull: { "hobbies.title": 'Hiking' } }` to traverse the element.

## Remove multiple elements from the array field inside the document using ==> $pull <==

Dataset:

```js
{
    "_id" : ObjectId("6036953aec9d2a3612452bae"), "name" : "Chris",
    "friends" : [
                  { "name" : "xyz", "age" : 23 }, // delete
                  { "name" : "xyz", "age" : 34 }, // delete
                  { "name" : "abc", "age" : 18 },
                  { "name" : "pqr", "age" : 27 }  // delete
                ],
}
```

Solution:

```js
db.users.updateOne({ name: 'Chris' }, { $pull: { friends: { name: { $in: ['xyz', 'pqr'] } } } });
```

## Remove multiple elements from the array field inside the document using ==> $pullAll <==

#### NOTE: This won't work well with array of documents (use above example for that)

Dataset:

```js
{ _id: 1, scores: [ 0, 2, 5, 5, 1, 0 ] }
```

Solution:

```js
db.survey.update({ _id: 1 }, { $pullAll: { scores: [0, 5] } });
```

Updated dataset:

```js
{ "_id" : 1, "scores" : [ 2, 1 ] }

```
