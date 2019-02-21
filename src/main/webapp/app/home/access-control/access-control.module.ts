import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessControlComponent } from './access-control.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AccessControlComponent],
    imports: [CommonModule, FormsModule],
    exports: [AccessControlComponent]
})
export class AccessControlModule {}
