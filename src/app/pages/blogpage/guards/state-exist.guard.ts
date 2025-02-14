import { inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { BlogSelectors } from "../store/blog.selectors";

export const stateExistGuard = () => {
    const store = inject(Store);

    const sig = store.selectSignal(BlogSelectors.blogs);

    return sig().length > 0;
}