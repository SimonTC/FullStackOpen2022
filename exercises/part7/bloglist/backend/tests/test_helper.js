const Blog = require('../models/blog');
const User = require('../models/user');
const blogData = require('./test_data').blogs;

const initialBlogs = blogData.map((data) => new Blog(data));
const initialUsers = [
  new User({ username: 'root', name: 'Johnny', passwordHash: 'secret' }),
];

const recreateInitialBlogs = async () => {
  await Blog.deleteMany({});

  const blogOwner = await User.findOne({});
  const initialBlogs = blogData.map((data) => new Blog(data));
  initialBlogs.forEach((b) => (b.user = blogOwner));
  await Blog.insertMany(initialBlogs);
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'My removable blog',
    author: 'Someone Forgettable',
    url: 'www.ForgetMeNot.com',
    likes: 501,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb,
  initialUsers,
  createInitialBlogs: recreateInitialBlogs,
};
