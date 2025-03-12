import * as dotenv from "dotenv"
dotenv.config()

export default () => ({
   google_callback_url: process.env.google_callback_url,
   google_client_id: process.env.google_client_id,
   google_secret_id: process.env.google_secret_id,
   jwt_refresh_key: process.env.jwt_refresh_key,
   jwt_secret_key: process.env.secret_key
})