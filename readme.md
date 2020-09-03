// deletes all the users 
```await User.deleteMany({ name: "Joe" })```

// similar to find first and then remove
```await User.findByIdAndDelete("5f507d2635506227c0be4316")```

// this updates all the queries 
```await User.updateMany({ name: "Karan" })```

// this updates the first entry 
```await User.updateOne({ name: "Jonny" })```

<h3>How would you increment the post count by 1 for all the users?</h3>

<h4>NOTE</h4>
Any time that we can avoid loading the data to our server is a big win for us. This would enhance the performance of our query big time. 
USE these for BULK changes! It won't make much difference for a single record updation.

##### Bad approach: 
- An approach could be to load all the users on to our server, increment it by 1 and save all of them once done.

##### Goog approach: 
- Send an instruction to the mongodb instead called ```MONGO UPDATE OPERATORS```

Docs: https://docs.mongodb.com/manual/reference/operator/update/

*example*: 
```shell
# this will find the records with the name Joe and increment the post count
User.update({ name: "Joe" }, { $inc: { postCount: 1 } })
```





