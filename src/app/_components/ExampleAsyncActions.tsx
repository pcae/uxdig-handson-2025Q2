import { getUserName } from '../_actions/hello'

const ExampleAsyncActions = async () => {
  const data = await getUserName()
  console.log(data)

  return <div>{data?.name}</div>
}
export default ExampleAsyncActions
