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

**NOTE**: Use `$inc : { age: -1 }` to decrement.

## $min $max and $mul

Find the document by the name of Max and set the age to 40 _if existing age is LESS THAN 40_ otherwise do nothing.

`db.users.updateOne({ name: "Max" }, { $min: { age: 40 } })` // this means keep the lower value

Find the document by the name of Max and set the age to 40 _if existing age is MORE THAN 40_ otherwise do nothing.

`db.users.findOne({ name: "Max", { $max: : { age: 40 } } })` // this means keep the higher value

Find the document by the name of Max and set the age to _DOUBLE_

`db.users.findOne({ name: "Max", { $mul: : { age: 2 } } })`

## Drop or delete a specific field from a document ( $unset )

`db.users.findOne({ name: "Max", { $unset: { age: "" } } })`
