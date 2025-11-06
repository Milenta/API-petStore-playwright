import { test, expect } from '@playwright/test'
import { ApiRequestBuilder, HttpMethod } from '../helper/apiRequestBuilder' // import method
import { PetData } from '../data/PetData'

const apiBaseUrl = 'https://petstore.swagger.io/v2'
const dataPetO = new PetData() // create new instance of class
const dataUser = dataPetO.generateRandomUser()

test('Create new user and assert data with get request', async () => {
  const responsePost = await new ApiRequestBuilder()
    .setMethod(HttpMethod.POST)
    .setBaseURL(apiBaseUrl)
    .setEndpoint('/user')
    .setBody({
      id: dataUser.id,
      username: dataUser.username,
      firstName: dataUser.firstName,
      lastName: dataUser.lastName,
      email: dataUser.email,
      password: dataUser.password,
      phone: dataUser.phone,
      userStatus: dataUser.userStatus,
    })
    .send() // send request

  expect(responsePost.status).toBe(200) // Expecting a 200 - status OK

  const responseGet = await new ApiRequestBuilder()
    .setMethod(HttpMethod.GET)
    .setBaseURL(apiBaseUrl)
    .setEndpoint(`/user/${dataUser.username}`)
    .send() // send request

  expect(responseGet.status).toBe(200) // Expecting a 200 - status OK

  const dataGet = await responseGet.json()
  expect(dataGet).toMatchObject({
    id: dataUser.id,
    username: dataUser.username,
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
    email: dataUser.email,
    password: dataUser.password,
    phone: dataUser.phone,
    userStatus: dataUser.userStatus,
  })
})

test('User login - 200', async () => {
  const responsePost = await new ApiRequestBuilder()
    .setMethod(HttpMethod.GET)
    .setBaseURL(apiBaseUrl)
    .setEndpoint(`/user/login?username=${dataUser.username}&password=${dataUser.password}`)
    .send() // send request

  expect(responsePost.status).toBe(200)
})

test.skip('Update user and assert data with get request', async () => {
  const dataPut = dataPetO.generateRandomUser()

  const responsePut = await new ApiRequestBuilder()
    .setMethod(HttpMethod.PUT)
    .setBaseURL(apiBaseUrl)
    .setEndpoint(`/user/${dataUser.username}`)
    .setBody({
      id: dataPut.id,
      username: dataPut.username,
      firstName: dataPut.firstName,
      lastName: dataPut.lastName,
      email: dataPut.email,
      password: dataPut.password,
      phone: dataPut.phone,
      userStatus: dataPut.userStatus,
    })
    .send() // send request

  expect(responsePut.status).toBe(200) // Expecting a 200 - status OK

  const dataPutResponse = await responsePut.json()
  expect(dataPutResponse.code).toEqual(200)

  const responseGet = await new ApiRequestBuilder()
    .setMethod(HttpMethod.GET)
    .setBaseURL(apiBaseUrl)
    .setEndpoint(`/user/${dataPut.username}`)
    .send() // send request

  expect(responseGet.status).toBe(200) // Expecting a 200 - status OK

  const dataGet = await responseGet.json()
  expect(dataGet).toMatchObject({
    id: dataPut.id,
    username: dataPut.username,
    firstName: dataPut.firstName,
    lastName: dataPut.lastName,
    email: dataPut.email,
    password: dataPut.password,
    phone: dataPut.phone,
    userStatus: dataPut.userStatus,
  })
})

test.skip('Validate error message when user does not exist', async () => {
  const responseGet = await new ApiRequestBuilder()
    .setMethod(HttpMethod.GET)
    .setBaseURL(apiBaseUrl)
    .setEndpoint(`/user/334`)
    .send() // send request

  expect(responseGet.status).toBe(404) // Expecting a 404 - not found

  const dataGet = await responseGet.json()
  expect(dataGet).toMatchObject({
    code: 1,
    type: 'error',
    message: 'User not found',
  })
})

test.afterAll('Delete data', async () => {
  // delete created data

  const responseDelete = await new ApiRequestBuilder()
    .setMethod(HttpMethod.DELETE)
    .setBaseURL(apiBaseUrl)
    .setEndpoint(`/user/${dataUser.username}`)
    .send() // send request

  expect(responseDelete.status).toBe(200) // Expecting a 200
  console.log('deleted user ' + dataUser.username)
})
