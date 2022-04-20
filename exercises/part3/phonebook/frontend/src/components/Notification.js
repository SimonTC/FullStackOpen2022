const baseStyle = {
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

const errorStyle = {...baseStyle, color:'red'}
const successStyle = {...baseStyle, color:'green'}

const Notification = ({notification}) => {
  if (notification === null){
    return null
  }

  return (
    <div style={notification.isError ? errorStyle : successStyle}>
      {notification.message}
    </div>
  )
}

export default Notification