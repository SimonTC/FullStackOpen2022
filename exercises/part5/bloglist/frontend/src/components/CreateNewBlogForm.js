import {useState} from "react";

export function CreateNewBlogForm({handleBlogCreation}) {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogDataChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()

    handleBlogCreation({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          Title:
          <input
            value={title}
            name="Title"
            onChange={handleBlogDataChange(setTitle)}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            name="Author"
            onChange={handleBlogDataChange(setAuthor)}
          />
        </div>
        <div>
          Url:
          <input
            value={url}
            name="Url"
            onChange={handleBlogDataChange(setUrl)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}