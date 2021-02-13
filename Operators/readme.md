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

## To find all the movies who's length is less than 60 mins:

```js
db.movies.find({ runtime: { $lt: 60 } });
```

## To find all the movies who's rating is greater than 8.5

```js
db.movies.find({ 'rating.average': { $gt: 8.5 } });
```

## To find all movies who's genres contain 'adventure'

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

## To find movies who's runtime is either 60 or 90

```js
db.movies.find({
  runtime: {
    $in: [60, 90],
  },
});
```

src: https://docs.mongodb.com/manual/reference/operator/query/
