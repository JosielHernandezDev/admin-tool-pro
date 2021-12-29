export class User {
  constructor(
    public name: String,
    public email: String,
    // public active: Boolean,
    public password?: String,
    public image?: String,
    public google?: Boolean,
    public role?: String,
    public uid?:string
  ) {}
}
