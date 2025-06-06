import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./app-root/app.component"
import { HeaderComponent } from "./cmps/header/header.component"
import { ChatComponent } from "./cmps/chat/chat.component"
import { ChatBodyComponent } from "./cmps/chat/body/chat-body.component"
import { ChatAddComponent } from "./cmps/chat/add/chat-add.component"

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ChatComponent,
		ChatBodyComponent,
		ChatBodyComponent,
		ChatAddComponent,
	],
	imports: [BrowserModule, FormsModule],
	providers: [provideHttpClient()],
	bootstrap: [AppComponent],
})
export class AppModule {}
