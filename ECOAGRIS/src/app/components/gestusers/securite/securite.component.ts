import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-securite',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, RouterLinkActive, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule],
  templateUrl: './securite.component.html',
  styleUrl: './securite.component.scss'
})
export class SecuriteComponent {

  hide = true;

  id;

  constructor(
      public themeService: CustomizerSettingsService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
}

  toggleTheme() {
      this.themeService.toggleTheme();
  }

  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}
