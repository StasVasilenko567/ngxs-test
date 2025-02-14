import { inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { BlogSelectors } from "../store/blog.selectors";
import { Router } from "@angular/router";

export const stateExistGuard = () => {
    const store = inject(Store);
    const router = inject(Router);

    const sig = store.selectSignal(BlogSelectors.blogs);

    if (sig().length === 0) {
        router.navigate(['/']);
    }
}