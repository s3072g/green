import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { NgvI18nModule } from '@sebgroup/green-angular/src/v-angular/i18n'
import { NgvInputMaskModule } from '@sebgroup/green-angular/src/v-angular/input-mask'
import { NgvInputComponent } from './input.component'

@NgModule({
  declarations: [NgvInputComponent],
  imports: [
    CommonModule,
    NgvI18nModule,
    NgvInputMaskModule,
    ReactiveFormsModule,
  ],
  exports: [NgvInputComponent],
})
export class NgvInputModule {}
