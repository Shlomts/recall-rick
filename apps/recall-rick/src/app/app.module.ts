import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { provideHttpClient } from "@angular/common/http"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { AppComponent } from "./app-root/app.component"
import { HeaderComponent } from "./cmps/header/header.component"
import { ChatComponent } from "./cmps/chat/chat.component"
import { ChatBodyComponent } from "./cmps/chat/body/chat-body.component"
import { ChatAddComponent } from "./cmps/chat/add/chat-add.component"
import { ChatMessageComponent } from "./cmps/chat/message/chat-message.component"
import { AnswersComponent } from "./cmps/chat/answers/answers.component"

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ChatComponent,
		ChatBodyComponent,
		ChatBodyComponent,
		ChatAddComponent,
		ChatMessageComponent,
		AnswersComponent,
	],
	imports: [BrowserModule, CommonModule, FormsModule],
	providers: [provideHttpClient()],
	bootstrap: [AppComponent],
})
export class AppModule {}
