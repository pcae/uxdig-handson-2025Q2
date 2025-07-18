import { HttpResponse, ResponseResolver } from 'msw'
import db from 'src/mocks/db'

const getSample: ResponseResolver = ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const user = id
    ? db.user.findFirst({
        where: {
          id: {
            equals: id,
          },
        },
      })
    : db.user.getAll()
  console.log(user)

  return new HttpResponse(JSON.stringify(user), { status: 200 })
}

const postSample: ResponseResolver = async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const username = url.searchParams.get('username')

  if (!id || !username)
    return new HttpResponse(
      JSON.stringify({
        message: '"id" and "username" is requried.',
      }),
      {
        status: 400,
      },
    )
  const user = db.user.create({
    id: id,
    username: username,
  })
  console.log(user)

  return new HttpResponse(JSON.stringify(user), { status: 200 })
}

const putSample: ResponseResolver = async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const username = url.searchParams.get('username')

  if (!id || !username)
    return new HttpResponse(
      JSON.stringify({
        message: '"id" and "username" is requried.',
      }),
      { status: 400 },
    )
  const updatedUser = db.user.update({
    where: {
      id: {
        equals: id,
      },
    },
    data: {
      username: username,
    },
  })
  console.log(updatedUser)

  return new HttpResponse(JSON.stringify(updatedUser), {
    status: 200,
  })
}

export { getSample, postSample, putSample }
