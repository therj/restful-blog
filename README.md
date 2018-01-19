# restful-blog

[Node](https://nodejs.org/en/) with RESTful routes!

CRUD operations with [MongoDB](https://www.mongodb.com).

## RESTful Routes
| S.N. | HTTP Verb | Action  | URL             |
|------|-----------|---------|-----------------|
| 1.   | GET       | index   | /blogs/         |
| 2.   | GET       | new     | /blogs/new      |
| 3.   | POST      | create  | /blogs          |
| 4.   | GET       | show    | /blogs/:id      |
| 5.   | GET       | edit    | /blogs/:id/edit |
| 6.   | PATCH/PUT | update  | /blogs/:id      |
| 7.   | DELETE    | destroy | /blogs/:id      |

## Uses
* express
* ejs
* body-parser
* mongoose
* method-override
* express-sanitizer

##
Run `mongod` before app.

    git clone https://github.com/therj/restful-blog.git
    npm install
	node app.js
  
[App runs on port 4321 by default](http://localhost:4321/)
