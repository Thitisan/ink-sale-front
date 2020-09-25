export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/axios', //-- add plugins axios
    ],
    proxy: {
        '/api': 'http://127.0.0.1:8000', //-- ตั้งค่า map proxy url api server
        ws: true
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://bootstrap-vue.js.org
        'bootstrap-vue/nuxt',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        '@nuxtjs/auth' //-- add modules proxy
    ],
    auth: {
        redirect: {
            login: '/login'
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: 'http://127.0.0.1:8000/api/login', method: 'post', propertyName: 'token' },
                    logout: { url: 'http://127.0.0.1:8000/api/logout', method: 'get' ,propertyName: 'token'},
                    user: { url: 'http://127.0.0.1:8000/api/user', method: 'get', propertyName: 'user' },
                },
                tokenName: 'authorization',
                tokenType: false

            }
        }
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        vendor: [
            'vue-axios' //-- add vendor vue-axios
        ],
        extend(config, ctx) {}
    }
}
