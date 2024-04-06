import { BaseEntity, EntitySchemaColumnOptions } from "typeorm";

class CustomBaseEntity extends BaseEntity {
  id: any;

  static async updateById(id: any, data: any) {
    const instance = await this.findOne({ where: { id } });
    await this.createQueryBuilder()
      .update(instance)
      .set(data)
      .where("id = :id", { id })
      .execute();
    const updatedInstance = await this.findOne({ where: { id } });
    return { updatedInstance };
  }

  static async createAndSave(data: any) {
    const createdInstance = this.create(data);
    const instance = await createdInstance.save();
    return instance;
  }
}
export const BaseColumnSchemaPart = {
  id: {
    type: "int",
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: "created_at",
    type: "timestamp with time zone",
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: "updated_at",
    type: "timestamp with time zone",
    updateDate: true,
  } as EntitySchemaColumnOptions,
};

export default CustomBaseEntity;
