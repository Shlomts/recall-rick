import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app-root/app.component';
import { HeaderComponent } from './cmps/header/header.component';
import { ChatComponent } from './cmps/chat/chat.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ChatComponent],
  imports: [BrowserModule, FormsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
