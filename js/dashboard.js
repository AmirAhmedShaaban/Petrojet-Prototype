const token = localStorage.getItem('token');
const res = await fetch('http://localhost:5000/api/protected', {
  headers: { Authorization: 'Bearer ' + token },
});
const payload = await res.json();
console.log(payload);
