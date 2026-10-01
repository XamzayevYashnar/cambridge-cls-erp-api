import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { conf } from "./core";
import { Logger } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { DocumentBuilder } from "@nestjs/swagger";

export class App {

  static logger = new Logger(App.name);
  static port = conf.port;
  static api = "api/v1/";

  static async main(){
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(this.api);

    SwaggerModule.setup(`/docs`, app, this.swagger(app));

    app.listen(this.port ?? 3000, ()=>{
      this.logger.log(`Server is running on port: http://localhost:${this.port}`);
      this.logger.log(`Swagger is running: http://localhost:${this.port}/docs`);
    });
  };

  static swagger(app: any){
    const config = new DocumentBuilder()
      .setTitle('API for Swagger')
      .setDescription('API for Cambridge English Learning Center')
      .setVersion('1.0')
      .addCookieAuth()
      .build();

    return SwaggerModule.createDocument(app, config);
  };
}