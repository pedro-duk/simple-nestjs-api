export class UserProjection {
  static userBasicInfo() {
    return { _id: 0, name: 1, email: 1, role: 1 };
  }
}
