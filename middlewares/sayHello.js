const sayHello = (_request, _response, next) => {
  console.log('Hello from the middleware!')
  next()
}

export default sayHello