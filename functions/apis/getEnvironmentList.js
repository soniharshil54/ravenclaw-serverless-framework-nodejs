const p = require('phin');

module.exports.handler = async (event) => {

  // const res = await p('https://pokeapi.co/api/v2/pokemon/ditto')
  const res = await p({
    'url': 'https://reqres.in/api/products/3',
    'parse': 'json'
  })

  const apiResponse = res && res.body ? res.body : {
    message: 'No internet it seems'
  }

  console.log('res.body', res.body)

  const responseBody = {
    data: apiResponse
  }
  const response = {
    statusCode : 200,
    body : JSON.stringify(responseBody),
    isBase64Encoded : false,
    headers : {"content-type" : "application/json"}
  }
  return response;
}