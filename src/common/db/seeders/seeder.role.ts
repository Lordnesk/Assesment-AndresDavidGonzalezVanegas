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
        for(const x of dataRole){
            const query:Role | null=await repoRole.findOneBy({name:x.name});
            if(!query){
                const dataRole:Role=repoRole.create(x);
                await repoRole.save(dataRole);
            }
        }
    }

}