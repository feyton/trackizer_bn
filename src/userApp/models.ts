import { BaseEntity, EntitySchema } from "typeorm";
import { genAPIKey } from "../utils";

export class User extends BaseEntity {
  id: any;

  email: any;

  password: any;

  firstName: any;

  lastName: any;

  role: any;

  api_key: any;

  static async createAndSave(data: any) {
    const user = this.create({ ...data, api_key: genAPIKey() });
    const saveUser = await user.save();
    return saveUser;
  }
}

export const UserSchema = new EntitySchema({
  name: "User",
  tableName: "User",
  target: User,
  columns: {
    id: {
      primary: true,
      generated: true,
      type: "int",
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: true,
    },
    password: {
      type: "varchar",
      nullable: false,
      select: false,
    },
    firstName: {
      type: "varchar",
    },
    lastName: {
      type: "varchar",
    },
    role: {
      type: "varchar",
      default: "user",
    },
    image: {
      type: "varchar",
      nullable: false,
      default:
        "https://res.cloudinary.com/feyton/image/upload/v1643272521/user_nophzu.png",
    },
    api_key: {
      type: "varchar",
      nullable: false,
    },
  },
});

export default User;
