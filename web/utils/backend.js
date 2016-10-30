export function getLights() {
    return fetch('http://localhost:8080/api/lights')
      .then((res) => res.json())
      .catch((error) => console.log(error));
}

export function setLight(id,state) {
    return fetch('http://localhost:8080/api/lights/' + id, {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({on: state.toString()})
    })
      .then((res) => { return res.json(); })
      .catch((error) => console.log(error));
}
