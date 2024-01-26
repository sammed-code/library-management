# library-management

## Routes and endpoints
### /users
GET: Get all list of users
POST: Create a new user

### /users/{id}
GET: Get a user by their ID
POST: Update a user by ID
DELETE: Delete a user by ID (check if he/she have an issued book) && (is there any penalty to be collected from him/her)

Subscription:
    -> 3 months
    -> 6 months
    -> 12 months

### /users/subscription-details/{id}
GET: Get user subscription detais
    -> Date of subscription
    -> Valid till
    -> Fine if any


### /books
GET: Get all books
POST: Create/Add a new book

### /books/{id}
GET: Get a book by ID
POST: Update a book by ID

### /books/issued
GET: Get all issued books

### /books/issued/withfine
GET: Get all issued books with fine


## Fine Calculation
    -> If the user has an issued and the issued book is to be returned by 2 weeks.
    If he misses the date of renewal/return, then he needs to pay a penalty of 100Rs.

    -> If the user has an issued and the issued book is to be returned by 2 weeks.
    If he misses the date of renewal/return and subscription also ended, then he needs to pay a penalty of 100Rs.


MVC Architecture
M: Model(Tells us the structure of Mongodb Collection)
v: View(UI)
C: Controller(Brain/Logic of a router)