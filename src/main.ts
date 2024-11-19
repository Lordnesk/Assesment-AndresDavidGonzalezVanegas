import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { SeederRole } from './common/db/seeders/seeder.role';
import { SeederUser } from './common/db/seeders/seeder.user';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource= app.get(DataSource);
  const seederRole= new SeederRole();
  const seederUser = new SeederUser();

  await seederRole.run(dataSource);
  await seederUser.run(dataSource);
  
  try {
    console.log('🌱 Running SeederRole...');
    await seederRole.run(dataSource);
    console.log('✅ SeederRole completed.');

    console.log('🌱 Running SeederUser...');
    await seederUser.run(dataSource);
    console.log('✅ SeederUser completed.');
  } catch (error) {
    console.error('❌ Error running seeders:', error.message);
    process.exit(1); // Salir si hay errores
  }

  const PORT = 3000
  await app.listen(3000);
  console.log(`🚀 Server is running on http://localhost:${PORT}`);

}
bootstrap();
