import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './core/footer/footer.component';
import { PagesModule } from './feature/pages/pages.module';
import { PlanetsModule } from './feature/pages/planets/planets.module';
import { AuthModule } from './auth/auth.module';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { PostsModule } from './feature/posts/posts.module';
import { AuthGuard } from './core/guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    PagesModule,
    PlanetsModule,
    AuthModule,
    PostsModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
