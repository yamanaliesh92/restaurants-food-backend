import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from './../src/product.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});


    {
      "extra_config": {
        "qos/ratelimit/router": {
          "@comment": "slsls",
          "client_max_rate": 20,
          "every": "1s",
          "strategy": "ip"
        }
      },
      "output_encoding": "no-op",
      "backend": [
        {
          "url_pattern": "/api/users/{id}",
          "method": "POST",

          "host": ["http://user:3000"]
        }
      ],

      "endpoint": "/api/auth/user/{id}",
      "method": "POST",

      "input_query_strings": ["name"],
      "input_headers": [
        "Authorization",
        "Content-Type",
        "Content-Length",
        "Accept"
      ]
    },





    afterEachte






        {
      "extra_config": {
        "qos/ratelimit/router": {
          "@comment": "slsls",
          "client_max_rate": 20,
          "every": "1s",
          "strategy": "ip"
        }
      },
      "output_encoding": "no-op",
      "backend": [
        {
          "url_pattern": "/api/users/{id}",
          "method": "POST",

          "host": ["http://user:3000"],
          "deny": ["password"],
          "allow": ["userId", "id", "name"],
          "target": "response",
          "extra_config": {
            "qos/http-cache": {
              "shared": true
            }
          }
        }
      ],

      "endpoint": "/api/auth/user/{id}",
      "method": "POST",

      "input_query_strings": ["id"],
      "input_headers": [
        "Authorization",
        "Content-Type",
        "Content-Length",
        "Accept"
      ]
    }