// import http from "k6/http";
// import { check, sleep } from "k6";

// export const options = {
//   vus: 10,        // quantidade de usuários simultâneos
//   duration: "300s", // tempo em segundos
// };

// const BASE_URL = "http://localhost:3000";

// // faz login uma vez e reutiliza o token
// export function setup() {
//   const res = http.post(`${BASE_URL}/funcionarios/login`, JSON.stringify({
//     usuario: "admin",
//     senha: "admin123",
//   }), { headers: { "Content-Type": "application/json" } });

//   console.log("resposta login:", res.body);
//   return { token: res.json("token") };
// }

// export default function (data) {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${data.token}`,
//   };

//   // testa listagem de aeronaves
//   const aeronaves = http.get(`${BASE_URL}/aeronaves`, { headers });
//   check(aeronaves, {
//     "aeronaves: status 200": (r) => r.status === 200,
//     "aeronaves: tempo < 500ms": (r) => r.timings.duration < 500,
//   });

//   sleep(1);

//   // testa listagem de etapas
//   const etapas = http.get(`${BASE_URL}/etapas`, { headers });
//   check(etapas, {
//     "etapas: status 200": (r) => r.status === 200,
//     "etapas: tempo < 500ms": (r) => r.timings.duration < 500,
//   });

//   sleep(1);
// }