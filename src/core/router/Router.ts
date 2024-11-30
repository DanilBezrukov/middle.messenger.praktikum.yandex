import { Route } from '../route/route';
import { DefaultPage } from '../default-page/default-page';
import { Store } from '../store/Store';
const store = new Store();

export class Router {
    private routes: Record<string, Route> = {};
    private history?: History;
    private _currentRoute: Route | null = null;
    private readonly _rootQuery: string = '';
    static __instance: unknown;

    constructor(rootQuery: string = '#app') {
        if (Router.__instance) {
            return Router.__instance as Router;
        }

        this.history = window.history;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    createRoute(path: string, page: unknown): void {
        if (page instanceof DefaultPage) {
            this.routes[path] = new Route(path, page.component, {
                rootQuery: this._rootQuery,
                props: page.props,
                args: page.args,
            });
        }
    }

    use(routes: { [pathname: string]: unknown }): Router;
    use(routes: string, page: unknown): Router;
    use(routes: string | { [pathname: string]: unknown }, page?: unknown): Router {
        if (typeof routes === 'string' && page) {
            this.createRoute(routes, page);
        } else {
            for (const [pathname, page] of Object.entries(routes)) {
                this.createRoute(pathname, page);
            }
        }
        return this;
    }

    public start(url?: string): void {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window)?.location?.pathname);
        };

        this._onRoute(url || window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    public go(pathname: string): void {
        this.history?.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back(): void {
        this.history?.back();
    }

    public forward(): void {
        this.history?.forward();
    }

    private checkRedirect(pathname: string) {
        const userData = !!store.getState('user');
        const isAuthUrl = ['/', '/sign-up'].includes(pathname);
        const isRedirect = (userData && isAuthUrl) || (!userData && !isAuthUrl);
        if (isRedirect) {
            if (userData) {
                this.go(isAuthUrl ? '/messenger' : pathname);
            } else {
                this.go(isAuthUrl ? pathname : '/');
            }
        }
        return isRedirect;
    }

    private getRoute(pathname: string): Route | undefined {
        const isRedirect = this.checkRedirect(pathname);
        if (isRedirect) return;
        return this.routes[pathname] || this.routes['/*'];
    }
}
