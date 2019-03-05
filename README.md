nodejs server to serve my react apps and API requests

#Served apps
http://gregos.net/blog
http://gregos.net/todos
http://gregos.net/calc
http://gregos.net/hackeru

#blog API
C (post) http://gregos.net/api/blog/ - create new post
R (get) http://gregos.net/api/blog/ - get all posts
R (get) http://gregos.net/api/blog/:postId - get one post
U (put) not implemented
D (delete) http://gregos.net/api/blog/:postId - delete post

register: gregos.net/api/blog/signup
login: gregos.net/api/blog/signin

#todos API
C (post) http://gregos.net/api/todos/ - create new todo
R (get) http://gregos.net/api/todos/ - get all todo
R (get) http://gregos.net/api/todos/:todoId - get one todo
U (put) http://gregos.net/api/todos/:todoId - update todo
D (delete) http://gregos.net/api/todos/:todoId - delete todo