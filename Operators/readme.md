```js
[
  {
    name: 'batman',
    details: {
      genres: ['action', 'suspense'],
    },
    runtime: 90,
    rating: {
      average: 9,
      dislikes: 2,
    },
  },
  {
    name: 'thor',
    details: {
      genres: ['action', 'comedy'],
    },
    runtime: 50,
    rating: {
      average: 7,
      dislikes: 8,
    },
  },
  {
    name: 'lord of the rings',
    details: {
      genres: ['adventure', 'suspense'],
    },
    runtime: 110,
    rating: {
      average: 8.9,
      dislikes: 1,
    },
  },
];
```

# QUERY OPERATORS

## $lt or $gt

#### To find all the movies who's length is less than 60 mins:

```js
db.movies.find({ runtime: { $lt: 60 } });
```

#### To find all the movies who's rating is greater than 8.5

```js
db.movies.find({ 'rating.average': { $gt: 8.5 } });
```

## $elemMatch

#### To find all movies who's genres contain 'adventure'

```js
db.movies.find({
  'details.genres': {
    $elemMatch: {
      $eq: 'adventure',
    },
  },
});

// OR

db.movies.find({
  'details.genres': 'adventure',
});
```

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

Find the users who's hobbies have title "Sports" _and_ that same field has frequency: _gte 3_

**NOTE** : _You can use $and BUT that will not query on the same field_

```js
db.users.find({
  hobbies: {
    $elemMatch: { $and: [{ title: 'Sports' }, { frequency: { $gte: 3 } }] },
  },
});
```

## $in or $nin

#### To find movies who's runtime is either 60 or 90

```js
db.movies.find({
  runtime: {
    $in: [60, 90],
  },
});
```

## To find movies who's runtime is neither 60 or 90

```js
db.movies.find({
  runtime: {
    $nin: [60, 90],
  },
});
```

# LOGICAL OPERATORS

## $or and $nor

#### To find movies who's genres contains comedy OR whos rating is less than 8.5

```js
db.movies.find({
  $or: [{ 'details.genres': 'comedy' }, { 'rating.average': { $lt: 8.5 } }],
});
```

You can also use _$nor, $and or $nand_.

# ELEMENT OPERATORS

## $exist or $type

#### To find movies for which field runtime exists

```js
db.movies.find({
  runtime: { $exists: true },
});
```

# EVALUATE OPERATORS

## $regex or $expr

#### To find movies for which the genres consists "act"

```js
// option === i is for ignore case
db.movies.find({ 'details.genres': { $regex: 'act', $option: 'i' } });
```

#### To find the movies list who's dislikes are more than rating

_$expr is used to compare two fields within the document and while it is used, it is written first unlike other operators_

```js
db.movies.find({ $expr: { $gt: ['$rating.dislikes', 'rating.average'] } });
```

src: https://docs.mongodb.com/manual/reference/operator/query/
