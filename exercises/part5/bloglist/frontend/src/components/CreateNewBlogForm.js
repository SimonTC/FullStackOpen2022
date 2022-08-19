export function CreateNewBlogForm({
    author,
    handleAuthorChange,
    handleTitleChange,
    handleUrlChange,
    onSubmit,
    title,
    url
  }) {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}