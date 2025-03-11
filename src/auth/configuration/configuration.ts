import * as dotenv from "dotenv"
dotenv.config()

export default () => ({
   google_callback_url: process.env.google_callback_url,
   google_client_id: process.env.google_client_id,
   google_secret_id: process.env.google_secret_id
})