export function getLights() {
    return fetch('http://localhost:8080/api/lights')
      .then((res) => res.json())
      .catch((error) => console.log(error));
}
