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
    },
  },
  {
    name: 'thor',
    details: {
      genres: ['action', 'comedy'],
    },
    runtime: 50,
    rating: {
      average: 8,
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

src: https://docs.mongodb.com/manual/reference/operator/query/
