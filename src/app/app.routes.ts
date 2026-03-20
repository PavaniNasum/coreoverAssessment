import { Routes } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'chatbot', pathMatch: 'full' },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: '**', component: NotFoundComponent }
];
