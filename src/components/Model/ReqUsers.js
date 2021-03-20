export default async function ReqUsers() {
    const url =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3001/api"

    const response = await fetch(`${url}/users`)
    const json = await response.json()
    return json
}