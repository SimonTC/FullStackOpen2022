const Notification = (notification) => {
  if (notification === null){
    return null
  }

  const className = notification.isError ? 'error' : 'success'

  return (
    <div className={className}>
      {notification.message}
    </div>
  )
}

export default Notification