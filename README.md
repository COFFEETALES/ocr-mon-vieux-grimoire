# Mon Vieux Grimoire Backend Application

The backend application of **Mon Vieux Grimoire**, a project involved in the OpenClassrooms web developer training track.

## Environment Variables

To run this application, you need to set up the following environment variables:

- `MON_VIEUX_GRIMOIRE__SERVER_PORT`: The port on which the server will run.
- `MON_VIEUX_GRIMOIRE__MONGODB_URL`: The connection string for the MongoDB database.
- `MON_VIEUX_GRIMOIRE__JWT_SECRET_TOKEN`: The secret key used for JWT authentication.
- `MON_VIEUX_GRIMOIRE__SHA_512_SALT`: The salt used for SHA-512 hashing.

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the required environment variables:

   ```env
   MON_VIEUX_GRIMOIRE__SERVER_PORT=your_server_port
   MON_VIEUX_GRIMOIRE__MONGODB_URL=your_mongodb_connection_string
   MON_VIEUX_GRIMOIRE__JWT_SECRET_TOKEN=your_jwt_secret_token
   MON_VIEUX_GRIMOIRE__SHA_512_SALT=your_sha_512_salt
   ```

4. **Start the application:**

   ```bash
   yarn start
   ```

