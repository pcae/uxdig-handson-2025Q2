'use server'

export const getUserName = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { name: 'John Doe' }
}

let temp = [{ name: 'Jane Doe' }]
export const addUserNames = async (data: { name: string }) => {
  temp = [...temp, data]
  console.log(temp)

  await new Promise((resolve) => setTimeout(resolve, 1500))
  return temp
}
