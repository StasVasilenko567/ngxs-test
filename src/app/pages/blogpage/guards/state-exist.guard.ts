import { inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { BlogSelectors } from "../store/blog.selectors";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

export const stateExistGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const store = inject(Store);
    const router = inject(Router);

    const sig = store.selectSignal(BlogSelectors.blogs);

    if (sig().length === 0) {
        router.navigate(['/']);
    }

    if (!sig().find(blog => blog.id === route.params['id'] as string)) {
        router.navigate(['/']);
    }
}