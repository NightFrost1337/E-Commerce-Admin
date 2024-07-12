export default function useRouter() {
    const ROUTES = import.meta.glob('../pages/**/**/*.jsx', { eager: true });

    const routes = Object.keys(ROUTES).map((route) => {
        const path = route
          	.toLowerCase()
			      .split('/pages')[1]
          	.replace(/\.\/pages|index|\.jsx$/g, '')
            .replace(/\([^()]*\)/g, '')
          	// .replace(/\[\.{3}.+\]/, '*')
          	.replace(/\[(.+?)\]/g, ':$1');
      
        return { path, component: ROUTES[route].default };
    });

    return routes;
}