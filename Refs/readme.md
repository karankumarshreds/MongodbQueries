<h1>Populate</h1>

**Few important notes:**
- *Models* are defined using *Schemas*
- Instance of a model is called *document*

You can use **populate()** method to refer to the other documents.

The below examples shows **one to many relation** between *authors* and *books*: 

```typescript
import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Book'
  }]
})

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author'
  }
})

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);
```
Here, the ref option tells Mongoose which model to use during population. 

#### Note: 
```ObjectId, String, Number, Buffer``` all are valid types for refs. However, you should use ObjectUd unless you want to use it for advanced queries.

