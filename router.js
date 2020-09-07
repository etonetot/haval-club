import Vue from 'vue'
import Router from 'vue-router'
 
import Catalog from '~/pages/index'
import AllNews from '~/pages/news/index'
import NewsItem from '~/pages/news/_id'
import Car from '~/pages/_car'
import CarProps from '~/pages/_car/index'
import CarDoc from '~/pages/_car/doc/index'
import CarNews from '~/pages/_car/news'
import CarSales from '~/pages/_car/sales'
import CarVideo from '~/pages/_car/video'
import CarDocItem from '~/pages/_car/doc/_docid'
import CarPhoto from '~/pages/_car/photo'
 

Vue.use(Router)
 
export function createRouter() {
  return new Router({
    mode: 'history',

    routes: [
        {
            path: "/",
            component: Catalog,
            meta: { breadcrumb: 'Модели Haval'  },
            name: "index"
        }, 
        {
            path: "/news",
            component: AllNews,
            name: "news",
            meta: { breadcrumb: 'Новости о Haval'  },
        }, 
        {
            path: "/news/:id?",
            component: NewsItem,
            meta:{  
                breadcrumb () {
                    return  {
                        title: this.$store.state.news.newsitem.subject,
                        parent: "/news"    
                    } 
                }   
            },
            //props: true,

            name: "newsitem-id"
        },
        {
            path: "/:car",
            component: Car,
            meta:{  breadcrumb () {
                        return {
                            title: this.$store.state.curCarData.modelname,
                            parent: "/"
                    }
                }   
            },
            children: [
                {
                    path: "",
                    component: CarProps,
                    name: "car",
                    meta: { breadcrumb: "Характеристики и цены в Китае"  },
                }, 
                {
                    path: "props/:year?",
                    component: CarProps,
                    name: "props",
                    meta: { breadcrumb: "Характеристики и цены в Китае"  },
                }, 
                {
                    path: "doc",
                    component: CarDoc,
                    meta:{  breadcrumb: "Документация"  },
                    name: "car-doc"
                }, 
                {
                    path: "news",
                    component: CarNews,
                    meta:{  breadcrumb: "Новости", },
                    name: "car-news"
                }, 
                {
                    path: "sales",
                    component: CarSales,
                    meta:{  breadcrumb: "Статистика продаж", },
                    name: "car-sales",
                }, 
                {
                    path: "video",
                    component: CarVideo,
                    meta:{  breadcrumb: "Видео", },
                    name: "car-video"
                }, 
                {
                    path: "doc/:docid",
                    component: CarDocItem,
                    meta:{  breadcrumb () {
                                return  {
                                    title: this.$store.state.doc.curDoc.docname,
                                    parent: "/:car/doc"    
                                } 
                            }   
                    },
                    name: "car-doc-docid"
                }, 
                {
                    path: "photo/:folder?",
                    component: CarPhoto,
                    meta:{  breadcrumb () {
                                if (!this.$route.params.folder) 
                                    return  "Фотографии";  
                                return {
                                    title: this.$store.getters['photos/GET_CURFOLDERTITLE'](this.$route.params.folder),
                                    parent: { 
                                        title: "Фотографии", 
                                        path: "/"+this.$route.params.car+"/photo/" 
                                    }
                                }
                            }   
                    },
                    name: "car-photo-folder",

                    

                }
            ]
        },

    ],
  



  })
}