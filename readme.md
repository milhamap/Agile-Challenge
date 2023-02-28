<p align="center"><img src="https://agileteknik.com/assets/img/agile-teknik-h40px.png?v=3" width="100%"></p>

## About this Project

Projek ini dibuat tugas untuk pembentukan kelompok pada mata kuliah agile

Credits by Muhammad Ilham Adi Pratama

## Depedencies

### Backend
- [Express JS](https://expressjs.com/).
- [Knex](https://knexjs.org/).
- [JSON Web Token](https://www.npmjs.com/package/@types/jsonwebtoken).
- [Bcrypt](https://www.npmjs.com/package/bcrypt).
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser).
- [Cors](https://www.npmjs.com/package/cors).
- [DotENV](https://www.npmjs.com/package/dotenv).
- [PostgreSQL](https://www.npmjs.com/package/pg)
- [Morgan](https://www.npmjs.com/package/morgan).
- [Nodemon](https://www.npmjs.com/package/nodemon).

### Frontend
- [Axios](https://www.npmjs.com/package/axios)
- [Bootstrap](https://www.npmjs.com/package/bootstrap)
- [CoreJS](https://www.npmjs.com/package/core-js)
- [Vue](https://www.npmjs.com/package/vue)
- [Vue Cookies](https://www.npmjs.com/package/vue-cookies)
- [Vue Router](https://www.npmjs.com/package/vue-router)

# Tutorial Github

## How to Cloning Repository

1. Pada Komputer Anda Buka Console / Command Promt

2. Ketikan Perintah Berikut

```
git clone https://github.com/milhamap/Agile-Challenge.git
```

3. Masuk Ke Dalam Folder Hasil Clone

```
cd Agile-Challenge
```

# How to Use and Configuration Node JS Express

1. Install Node Package Manager Terlebih Dahulu <br>
   [Download disini](https://nodejs.org/en/download/)

2. Masuk ke Dalam Folder Backend

```
cd backend
```

3. Install all javascript dependecies untuk Backend Terlebih Dahulu

```
$ npm install
```

4. Copy isi file .env.example

```
cp .env.example .env
```

5. Ubah dependencies berikut untuk connect ke Postgre Development pada env

```
PGHOST_DEV=YOUR_HOST_DEVELOPMENT
PGDATABASE_DEV=YOUR_DATABASE_DEVELOPMENT
PGUSER_DEV=YOUR_USER_DEVELOPMENT
PGPASSWORD_DEV=YOUR_PASSWORD_DEVELOPMENT
```
6. Lakukan Migrasi Database

```
$ knex migrate:latest
```

7. Run server using `npm` command below

```
$ npm run dev
```

8. Untuk proses pembuatan akun seperti login, register, createFood, updateFood dan deleteFood bisa diakses melalui postman dengan dokumentasi berikut [disini](https://documenter.getpostman.com/view/21604420/2s93CRLreQ) dikarenakan untuk pada saat slicing frontend waktunya tidak mencukupi

# How to Use and Configuration Vue JS
1. Masuk ke Dalam Folder Frontend

```
cd frontend
```

2. Install all javascript dependecies untuk Frontend Terlebih Dahulu

```
$ npm install
```

3. Run server using `npm` command below

```
$ npm run serve
```
