import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as CORS from 'cors';
import * as compression from 'compression';
import helmet from 'helmet';
import { json } from 'express';

export class Configurator {
  private readonly contentTypes: Array<string>;
  private readonly documentBuilder: DocumentBuilder;
  private useSwagger: boolean;
  private useContentTypes: boolean;

  constructor(private readonly app: INestApplication) {
    this.documentBuilder = new DocumentBuilder();
    this.contentTypes = ['application/json'];
  }

  setSwaggerTitle(title: string): Configurator {
    this.useSwagger = true;
    this.documentBuilder.setTitle(title);
    return this;
  }

  setSwaggerDescription(description: string): Configurator {
    this.useSwagger = true;
    this.documentBuilder.setDescription(description);
    return this;
  }

  setSwaggerVersion(version: string, environment = '') {
    this.useSwagger = true;
    const _version = `${version}${environment ? '-' : ''}${environment}`;
    this.documentBuilder.setVersion(_version);
    return this;
  }

  addCors(): Configurator {
    this.app.use(CORS());
    return this;
  }

  addCompression(): Configurator {
    this.app.use(compression());
    return this;
  }

  addHelmet(): Configurator {
    this.app.use(helmet());
    return this;
  }

  addSerialization(): Configurator {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    return this;
  }

  addCloudEvents(): Configurator {
    this.useContentTypes = true;
    this.contentTypes.push('application/cloudevents+json');
    return this;
  }

  build() {
    if (this.useContentTypes) {
      this.app.use(json({ type: this.contentTypes }));
    }

    if (this.useSwagger) {
      const swaggerDocument = this.documentBuilder.build();
      const document = SwaggerModule.createDocument(this.app, swaggerDocument);
      SwaggerModule.setup('docs', this.app, document);
    }
  }
}
