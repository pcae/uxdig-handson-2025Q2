import { factory, primaryKey } from '@mswjs/data'
const db = factory({
  user: {
    id: primaryKey(String),
    username: String,
  },
})

export default db
