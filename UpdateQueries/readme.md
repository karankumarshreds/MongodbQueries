# UPDATE QUERIES

```JS
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
}
```

## updateOne

```js
db.persons.updateOne(
  {
    name: 'Max', // filter
  },
  {
    $set: {
      hobbies: [
        {
          title: 'SportsUpdated',
          frequency: 3,
        },
        {
          title: 'CookingUpdated',
          frequency: 6,
        },
      ],
    },
  }
);
```

## updateMany

Find all the documents who's name is Max and add a new attribute `isSporty: true`.

```js
db.persons.updateMany(
  {
    name: 'Max',
  },
  {
    $set: {
      isSporty: true,
    },
  }
);
```

## $inc

Find the document by the name Max, increment the age by 1 and set the name to Maxwell

```js
db.persons.updateOne(
  {
    name: 'Max',
  },
  {
    $inc: { age: 1 },
    $set: { name: 'Maxwell' },
  }
);
```
