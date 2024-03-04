export default interface ActivateTokenType {
  userId: number;
  token: string;
  activatedAt?: Date;
}
