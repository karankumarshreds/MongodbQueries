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

```js
db.persons.updateOne(
  {
    name: 'Max',
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
