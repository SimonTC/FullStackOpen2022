import { useState } from 'react';

export function CreateNewBlogForm({ handleBlogCreation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogDataChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const createBlog = (event) => {
    event.preventDefault();

    handleBlogCreation({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor="title-input">Title:</label>
          <input
            value={title}
            id="title-input"
            name="Title"
            onChange={handleBlogDataChange(setTitle)}
          />
        </div>
        <div>
          <label htmlFor="author-input">Author:</label>
          <input
            value={author}
            id="author-input"
            name="Author"
            onChange={handleBlogDataChange(setAuthor)}
          />
        </div>
        <div>
          <label htmlFor="url-input">Url:</label>
          <input
            value={url}
            id="url-input"
            name="Url"
            onChange={handleBlogDataChange(setUrl)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
