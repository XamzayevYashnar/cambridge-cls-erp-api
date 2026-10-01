import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

export class App {
    static async main(){
        const app = await NestFactory.createMicroservice<MicroserviceOptions>(
            AppModule,
            {
                transport: Transport.TCP,
                options: { host: '127.0.0.1', port: 4001 }
            },
        );

        await app.listen();
    }
}