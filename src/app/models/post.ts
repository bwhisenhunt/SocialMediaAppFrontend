export class Post {
    postId?: string;
    title?: string;
    content?: string;
    userName?: string;


    constructor(postid?: string, title?: string, content?: string, userName?: string) {
        this.postId = postid;
        this.title = title;
        this.content = content;
        this.userName = userName;
    }
}