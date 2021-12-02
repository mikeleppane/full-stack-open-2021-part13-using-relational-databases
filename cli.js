const { Blog } = require("./models");

Blog.findAll()
  .then((blogs) => {
    blogs.map((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
  })
  .catch((error) => console.error(error));
