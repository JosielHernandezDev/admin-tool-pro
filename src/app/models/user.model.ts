import { environment } from 'src/environments/environment';

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public image?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  get imageProfile() {
    if (this.image) {
      if (this.image.includes('http') || this.image.includes('https')) {
        return `${this.image}`;
      }
      return `${environment.base_api}/upload/users/${this.image}`;
    }

    return `${environment.base_api}/upload/no-image`;
  }

  get userProfile() {
    return {
      name: this.name,
      email: this.email,
      google: this.google,
      role: this.role,
    };
  }

  set setprofileImg(img:string){
    this.image = img;
  }
}
