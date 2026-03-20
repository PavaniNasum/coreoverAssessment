import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { of, delay } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, NgClass],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  messages: any[] = [];
  inputText = '';
  typing = false;

responses = [
  {
    keywords: ['hi', 'hello', 'hey'],
    reply: '👋 Hey there! I’m your virtual assistant. How can I help you today?'
  },
  {
    keywords: ['help', 'support'],
    reply: 'I can help with pricing, services, and general queries. Try asking something!'
  },
  {
    keywords: ['price', 'pricing', 'cost'],
    reply: ' Our pricing starts from $10/month. Flexible plans available!'
  },
  {
    keywords: ['services', 'offer'],
    reply: ' We offer AI solutions, web development, and analytics dashboards.'
  },
  {
    keywords: ['time', 'hours'],
    reply: ' We are available 24/7. You can ask me anything anytime!'
  },
  {
    keywords: ['contact', 'email'],
    reply: ' You can reach us at support@example.com'
  },
  {
    keywords: ['location', 'where'],
    reply: ' We operate globally with teams across multiple countries.'
  },
  {
    keywords: ['thanks', 'thank you'],
    reply: ' You’re welcome! Happy to help anytime.'
  },
  {
    keywords: ['bye', 'goodbye'],
    reply: 'Goodbye! Have a great day ahead!'
  },
  {
    keywords: ['features', 'product'],
    reply: ' product includes chatbot, analytics dashboard, and automation tools.'
  }
];

 sendMessage(){
  if (!this.inputText.trim()) return;

  this.messages.push({ text: this.inputText, type: 'user' });

  const userMsg = this.inputText.toLowerCase();
  this.inputText = '';
  this.typing = true;

  let response = 'Sorry, I didn’t understand.';

  for (let item of this.responses) {
    if (item.keywords.some(k => userMsg.includes(k))) {
      response = item.reply;
      break;
    }
  }

  setTimeout(() => {
    this.typing = false;
    this.messages.push({ text: response, type: 'bot' });
  }, 1000);
}

  startVoice() {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert('Not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();

    recognition.onresult = (e: any) => {
      this.inputText = e.results[0][0].transcript;
    };
  }
}