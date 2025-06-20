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
import { UserModalComponent } from "./cmps/user-modal/user-modal.component"
import { ErrorModalComponent } from './cmps/error-modal/error-modal.component';
import { PersonalizedDatePipe } from './pipes/personalized-date.pipe';

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
		UserModalComponent,
		ErrorModalComponent,
		PersonalizedDatePipe,
	],
	imports: [BrowserModule, CommonModule, FormsModule],
	providers: [provideHttpClient()],
	bootstrap: [AppComponent],
})
export class AppModule {}
