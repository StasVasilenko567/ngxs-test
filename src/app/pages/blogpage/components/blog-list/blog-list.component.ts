import { Component, inject } from "@angular/core";
import { BlogFacade } from "../../store/blog.facade";
import { AsyncPipe, CommonModule } from "@angular/common";
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { ContainerComponent } from "../../../../shared/components/container/container.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateBlogDialogComponent } from "../dialogs/create-blog-dialog/create-blog-dialog.component";
import { Blog } from "../../models/blog.model";

@Component({
    selector: "app-blog-list",
    templateUrl: "./blog-list.component.html",
    styleUrls: ["./blog-list.component.css"],
    imports: [
        CommonModule,
        AsyncPipe,
        BlogCardComponent,
        ContainerComponent,
        MatButtonModule,
        MatIconModule
    ]
})
export class BlogListPageComponent {
    private readonly blogFacade = inject(BlogFacade);
    private readonly dialog = inject(MatDialog);

    public blogs$ = this.blogFacade.blogs$;

    public openCreateDialog() {
        const dialogRef = this.dialog.open(CreateBlogDialogComponent, {
            width: "900px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.createBlog(result);
            }
        });
    }

    public createBlog(data: any) {
        const tempBlog: Blog = {
            id: Date.now().toString(),
            title: data.title,
            content: data.content,
            author: data.author,
            createdAt: data.createAt
        };
        this.blogFacade.addBlog(tempBlog);
    }
}