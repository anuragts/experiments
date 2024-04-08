import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()
app.use('*',prettyJSON())
app.get('/', (c) => {
  const a = c.req.url
  return c.text(`You pinged ${a} at route '${c.req.path}' `)
})

app.post('/end', async (c) => {
  const body = await c.req.json()
  return c.json({
    'message':`your body ${body.message}`
  })
} )

app.get('/crackeddevs', async(c) => {
  const API_KEY = 'c679bcd3-8e6c-4f56-966b-94ea061b6c0b';
  const LIMIT = 6;
  const ACTIVE = true;
  const response = await fetch(
    `https://api.crackeddevs.com/v1/get-jobs?limit=${LIMIT}&active=${ACTIVE}`,
    {
      headers: {
        'api-key': `${API_KEY}`,
      },
    }
  );
  const data = await response.json();
  
  return c.json(data);
})

export default app
