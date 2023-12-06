# Taller 2 - Backend
- El proyecto corresponde a un gestor de competencias entre 8 equipos, luego de 3 rondas solo queda un ganador.
- Los usuarios pueden apostar para quién será el ganador, si apostaron bien pueden ganar montos asociados al pozo total de quienes apostaron a un perdedor.
- Los usuarios tienen un monedero de donde se sacará el dinero para invertir en la apuesta.
- Los usuarios pueden eliminar la apuesta y recuperar su dinero.
- Los usuarios pueden ver el historial de apuestas, filtrando sus apuestas pendientes (que aún no se han deliberado), perdidas y ganadas, o todas a la vez, junto con el equipo al que apostó, el monto de la apuesta y la fecha de la misma.
- Existen 2 tipos de usuarios, los normales y los administradores:

> Normales
>> - Pueden realizar apuestas.
>> - Pueden eliminar sus apuestas.
>> - Pueden revisar su historial de apuestas.


> Administradores
>> - Pueden hacer lo mismo que los usuarios normales.
>> - Gestionan el campeonato.
>> - Pueden editar el nombre de los equipos y su puntaje en cada ronda.
>> - Una vez establecido el ganador, pueden hacer la repartición del pozo entre los ganadores.

- Dentro de la "base de datos" de GraphQl ya hay un usuario tipo administrador, sus datos son los siguientes:
* Usuario: admin
* Contraseña: admin

## Autor
Claudio Inal ROL: 201873060-2

## Ejecución
- Dentro de /graphql para levantar el gestor de API GraphQL ejecute:
```bash
npm install
```
- y luego
```bash
npm start
```

- Dentro de /GigaBET para levantar la página ejecute:
```bash
npm install
```
- y luego
```bash
npm run dev
```
