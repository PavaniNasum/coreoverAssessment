import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor() { }
    responses: any = {
    hello: "Hi! How can I help you?",
    help: "You can ask about pricing, services, etc.",
    pricing: "Our pricing starts at $10/month.",
    default: "Sorry, I didn’t understand that."
  };

  getResponse(message: string) {
    const key = message.toLowerCase();

    let reply = this.responses.default;

    if (key.includes('hello')) reply = this.responses.hello;
    else if (key.includes('help')) reply = this.responses.help;
    else if (key.includes('pricing')) reply = this.responses.pricing;

    return of(reply).pipe(delay(1500)); // simulate delay
  }
}
