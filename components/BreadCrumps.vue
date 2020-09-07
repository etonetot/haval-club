<template>
    <ol class="breadcrumb" v-if="items.length">
        <template v-for="(crumb, i) in items">
            <li :key="i+1">
                <router-link active-class="active" 
                    :to="{ path: crumb.path }" 
                    :tag="i != items.length-1 ? 'a' : lastTag"
                >
                    {{ crumb.title }}
                </router-link>
            </li>
            <li :key="-i" v-if="i != items.length-1" v-html="delimiter"></li>
        </template>
    </ol>
</template>

<script>

  export default {
    data() {
      return {
          delimiter: "&raquo;",
          lastTag: "a",  // "span"
      }
    },

    computed: {
        items() {
            return this.getItems();
        },
  
    },

    methods: {
        getBreadcrumb: function (routeRec) {
          if (!routeRec.meta.breadcrumb)  
            return;

          let bc = routeRec.meta.breadcrumb; 

          if (typeof bc === 'string')
            return { title: bc };

          if ( typeof bc === 'function' )
            bc = bc.call(this, this.$route.params);
          
          if (typeof bc === 'string')
            return { title: bc };
          return bc;  
        },
        // getBreadcrumb: function (bc) {
        //   return typeof bc === 'function' ? bc.call(this, this.$route.params) : bc;
        // },

        // getBreadcrumb: function (componentOptions) {
        //   let bc = componentOptions.breadcrumb;  
        //   if (bc)
        //     return typeof bc === 'function' ? bc.call(this, this.$route.params) : bc;
        //   else  
        //   {
        //       //let h = componentOptions.head;  
        //       //return typeof h === 'function' ? h.call(this) : h;

        //   }
  
        // },

        getItems: function () {
            const breadcrumbs = [];
            this.$route.matched.forEach(routeRecord => {
               
                let breadcrumb = this.getBreadcrumb( routeRecord );
                if (!breadcrumb)
                    return;
                
                if (breadcrumb.parent)
                {
                    if (typeof breadcrumb.parent=='object')
                    {
                            breadcrumbs.push({
                                path: breadcrumb.parent.path,
                                title: breadcrumb.parent.title
                            });
                    }
                    else
                    {
                        let parent = this.$router.resolve(breadcrumb.parent);
                        if (parent)
                        {
                            let titleParent = this.getBreadcrumb(parent.route);
                            breadcrumbs.push({
                                path: this.resolveParams(parent.route.path),
                                title: titleParent.title
                            });
                        }
                    }
                }

                let path = routeRecord.path.length > 0 ? routeRecord.path : '/';
                path = this.resolveParams(path);
                breadcrumbs.push({
                    title: breadcrumb.title, path
                });
            }, this);

            return breadcrumbs;
        },
 
        resolveParams: function(path){
                Object.keys(this.$route.params).forEach(param => {
                     path = path.replace(':' + param, this.$route.params[param] ? this.$route.params[param] : "");
                 }, this);
                path = path.replace(':page', "");
                return path;
        }


    },

  }
</script>


<style>

.breadcrumb 
{
    padding: 18px 12px;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
}

.breadcrumb li
{
    display: inline-flex;
    list-style-type: none;
}

.breadcrumb li:nth-child(2n) 
{
    padding: 0 12px;
}

.breadcrumb a
{
   text-decoration: none;
}
</style>
