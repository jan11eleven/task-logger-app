export default interface User {
  id?: number | undefined;
  firstName: string;
  age: number;
  birthday: Date;
  fullName: string;
  lastName: string;
  middleName?: string | undefined;
}
