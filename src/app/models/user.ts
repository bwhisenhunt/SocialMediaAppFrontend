import { Post } from "./post";

export class User {
    id?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    location?: string;
    posts?: Post[];
  
    constructor(email?: string, password?: string, firstName?: string, lastName?: string, bio?: string, location?: string) {
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.bio = bio;
      this.location = location;
    }
}