import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog'
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "delete-dialog",
    templateUrl: "./delete-dialog.component.html",
    styleUrls: ["./delete-dialog.component.css"],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogActions,
        MatDialogContent,
        MatIconModule
    ]
})
export class DeleteDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);

    public cancel() {
        this.dialogRef.close(false);
    }

    public submit() {
        this.dialogRef.close(true);
    }
}