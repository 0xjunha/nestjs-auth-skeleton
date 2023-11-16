## Framework & Libraries

Framework: NestJS / typescript / REST API

ORM: Prisma `v5.2.2`

Package Manager: Yarn `v1.22.19`

Auth Service: [Supabase Auth (OAuth)](https://supabase.com/auth)

Using [custom passport strategy](https://blog.iamstarcode.com/using-supabase-authentication-in-nestjs) for (Supabase + NestJS)

Deployment: [Github Action + AWS Elastic Beanstalk Docker Platform](https://github.com/marketplace/actions/beanstalk-deploy)

<br/>

## Setup

dotenv file

```
DATABASE_URL={YOUR_DATABASE_URL_WITH_OPTION_PARAMS}
SUPABASE_URL={https://YOUR_APP.supabase.co}
SUPABASE_ANON_KEY={YOUR_SUPABASE_PUBLIC_KEY}
SUPABASE_JWT_SECRET={YOUR_SUPABASE_JWT_SECRET}
```

github action secrets

```
AWS_ACCESS_KEY_ID={YOUR_AWS_SECRET_ACCESS_KEY}
AWS_SECRET_ACCESS_KEY={YOUR_AWS_SECRET_ACCESS_KEY}
```
