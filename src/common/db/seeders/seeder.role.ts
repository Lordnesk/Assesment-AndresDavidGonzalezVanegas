import { Role } from "src/role/entity/role.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";



export class SeederRole implements Seeder{
    async run(dataSource: DataSource,): Promise<any> {
        const repoRole=dataSource.getRepository(Role);
        
        const roles = [
            { name: 'Doctor' },
            { name: 'Patient' },
          ];
      
          for (const role of roles) {
            const exists = await repoRole.findOne({ where: { name: role.name } });
            if (!exists) {
              await repoRole.save(role);
              console.log(`${role.name}" created.`);
            } else {
              console.log(`${role.name}" already exists.`);
            }
          }
        }
}