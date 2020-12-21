## To find exact match of an array 

Let's suppose we need to query all the chats which has users: ['a', 'b']: 
```javascript
const chats = await Chat.find({
      users: {
        $all: ['a', 'b'], // order does not matter 
      },
    });
```
