class Content{
    paragraph?:string;
    image?:string;
    link?:string;
}

export class Admin {
    id?:string;
    title:string;
    authorName:string;
    category:string;
    titleImage:string;
    content:Array<Content>;
}
