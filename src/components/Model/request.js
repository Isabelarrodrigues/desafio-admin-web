export default async function request(path) {
    const url =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3001/api"

    const response = await fetch(`${url}/${path}`)
    const json = await response.json()
    return json
}