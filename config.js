const config = 
{
    title: "Haval Club",
    forumPage: "http://haval-club.ru/",
    httpserver:  "http://api.haval-club.ru/",
    apivendor: "haval/",
    imageserver:  "http://chinamobil.ru/",  

    newsimagesDir: "news/images/",
    imagesDir: "http://haval-club.ru/haval/images/",

    vendor: "",
    removeExtraPathItem: 1,  // remove great-wall from /great-wall/haval/h9/
    removeExtraPathItem2: 1,  // remove great-wall/haval/ from /great-wall/haval/h9/
}  


if ( process.env.NODE_ENV !== 'production' ) {
    config.title = "Haval Club DEBUG"
}



export default config;