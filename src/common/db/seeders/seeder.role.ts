import { Role } from "src/role/entity/role.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";

interface roles{
    name:string;
}

export class SeederRole implements Seeder{
    async run(dataSource: DataSource,): Promise<any> {
        const repoRole=dataSource.getRepository(Role);
        const dataRole:roles[]=[
            {name:"doctor"},
            {name:"patient"},
        ];
        for(const role of dataRole){
            const query:Role | null=await repoRole.findOneBy({name:role.name});
            if(!query){
                const dataRole:Role=repoRole.create(role);
                await repoRole.save(dataRole)
                console.log(`Role ${role.name} seeded successfully!`);
            }
        }
    }

}
