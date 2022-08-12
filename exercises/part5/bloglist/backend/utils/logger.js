const doIfNotTest = (action) => {
  if (process.env.NODE_ENV !== 'test'){
    action()
  }
}

const info = (...params) => {
  doIfNotTest(() => console.log(...params))
}

const error = (...params) => {
  doIfNotTest(() => console.error(...params))
}

module.exports = {
  info, error
}