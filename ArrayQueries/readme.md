## To find docs with exact match of an array  

Let's suppose we need to query all the chats which has property ```users: ['a', 'b']:```
```javascript
const chats = await Chat.find({
      users: {
        $all: ['a', 'b'], // order does not matter 
      },
    });
```
## To find docs if array property contains an element

Let's suppose we want to query all chats who's users property **contains user "a"**
```javascript
const chats = await Chat.find({
      users: {
        $elemMatch: {
          $eq: 'a',
        },
      },
    })
```
