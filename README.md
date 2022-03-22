## Description

[nestjs-configurator](https://githuyb.com/gm50x/nestjs-configurator) is a unified way to add CORS, Compression, Helmet, Serialization and initialize Swagger on NestJS applications.

## Installation

```bash
$ npm install @gm50x/nestjs-configurator
```

## Getting Started

Enabling Swagger and Cloud Events Serialization

```typescript
// @main.ts
import { NestFactory } from '@nestjs/core';
import { Configurator } from '@gm50x/nestjs-configurator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  new Configurator(app).setDefaults({
    swagger: {
      title: 'MagiTEK',
      description: 'MagiTEK Swagger Description',
    },
    enableCloudEvents: true,
  });

  await app.listen(3000);
}
bootstrap();
```

Or you could use without cloud events or swagger. (CORS, Compression, Helmet and Serialization(transformation))

```typescript
// @main.ts
import { NestFactory } from '@nestjs/core';
import { Configurator } from '@gm50x/nestjs-configurator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new Configurator(app).setDefaults();
  await app.listen(3000);
}
bootstrap();
```
