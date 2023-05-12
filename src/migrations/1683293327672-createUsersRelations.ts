import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersRelations1683293327672 implements MigrationInterface {
    name = 'CreateUsersRelations1683293327672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
    }

}
