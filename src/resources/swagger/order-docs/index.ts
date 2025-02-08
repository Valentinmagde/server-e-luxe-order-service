import config from "../../../config";

export default {
  "definition": {
    "openapi": "3.0.0",
    "info": {
      "title": "Order service documentation",
      "summary": "Order service documentation",
      "baseUrl": "/v1/orders",
      "version": "1.0.0",
      "description":
        "This is the documentation of the order microservice that gathers all the order-specific functionalities realized with Express and documented with Swagger.",
      "termsOfService": "#",
      "license": {
        "name": "Apache 2.0",
        "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
      },
      "contact": {
        "name": "Contact the Developper",
        "url": "#",
        "email": "valentinmagde@gmail.com"
      }
    },
    "basePath": "/v1/docs",
    "externalDocs": {
      "description": "Find more info here",
      "url": "#"
    },
    "servers": [
      {
        "url": `${config.apiGatewayUrl}`,
        "description": `${config.env} server`,
        "//variables": {
          "username": {
            "default": "demo",
            "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"
          },
          "port": {
            "enum": [
              "8443",
              "443"
            ],
            "default": "8443"
          },
          "basePath": {
            "default": "v2"
          }
        }
      }
    ],
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    }
  },
  "apis": [
    "./src/app/routes/*/*.ts",
    "./src/app/modules/*/*.ts",
    "./src/resources/swagger/order-docs/components/*.yaml",
    "./src/resources/swagger/order-docs/responses/*.yaml"
  ]
}