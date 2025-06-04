import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: Message[] = [];
  inputText = '';
  memory: Map<string, string> = new Map();

  sendMessage(): void {
    const text = this.inputText.trim();
    if (!text) return;

    const userMessage: Message = {
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    this.messages.push(userMessage);
    this.inputText = '';

    // Simulate bot response
    setTimeout(() => {
      const previousAnswer = this.memory.get(text.toLowerCase());
      const response = previousAnswer
        ? `🤖 Oh wow, déjà vu! I already said: "${previousAnswer}"`
        : this.generateBotResponse(text);

      this.messages.push({
        sender: 'bot',
        text: response,
        timestamp: new Date(),
      });

      if (!previousAnswer) this.memory.set(text.toLowerCase(), response);
    }, 500);
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private generateBotResponse(question: string): string {
    // Fun personality
    const jokes = [
      `You ask too many questions! But fine... here's my take on "${question}" 🤔`,
      `That's a spicy question! 🌶️ Here's what I think: "${question}"`,
      `Hmm... let me ask my imaginary friend... Okay got it.`,
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return `${randomJoke} (but seriously, I don't know)`;
  }
}
