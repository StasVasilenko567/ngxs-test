import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { BlogSelectors } from "../store/blog.selectors";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

export const stateExistGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const store = inject(Store);
    const router = inject(Router);

    const blogs = store.selectSignal(BlogSelectors.blogs);

    if (blogs().find(blog => blog.id === route.params['id'] as string)) {
        return true;
    }

    router.navigate(['/']);
    return false;
}