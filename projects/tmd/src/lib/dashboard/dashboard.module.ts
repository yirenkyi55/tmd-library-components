import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TmdModule } from '../tmd.module';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    MainContentComponent,
    DashboardComponent,
    FooterComponent,
    SidebarComponent,
    
  ],
  imports: [CommonModule, FontAwesomeModule, TmdModule],
  exports: [DashboardComponent],
})
export class TmdDashboardModule {}
