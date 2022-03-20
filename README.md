# url-shorter-dio

A simple URL shorter for a code challenge on [DIO](https://www.dio.me/)

After clone, install the dependencies:
>npm i

On the root of the project, create a .env file with:
>API_URL="http://localhost:4002" //Don't change this
>DATABASE_URL="YOUR_MONGODB_URL"

Run in development mode:
>npm run dev

POST 'localhost://4002/shorter' with:
>originURL: "some url (with http:// or https://)"

A unique hash will be generated. Then, GET:   
>localhost://4002/shorter/hash-generataded

you'll be redirected to the original site! :D
