import { AfterViewInit, Component, effect, ElementRef, inject, signal, ViewChild } from "@angular/core";
import { CreateBlogDialogComponent } from "../create-blog-dialog/create-blog-dialog.component";
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "signal-dialog",
    templateUrl: "./signal-dialog.component.html",
    styleUrls: ["./signal-dialog.component.css"],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogActions,
        MatDialogContent,
        MatIconModule,
        FormsModule,
        CommonModule
    ]
})
export class SignalDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<CreateBlogDialogComponent>);

    public textSignal = signal("");

    public close() {
        this.dialogRef.close();
    }
}