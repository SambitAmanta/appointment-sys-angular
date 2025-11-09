import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';

function getRole(): 'admin'|'provider'|'customer'|'public' {
  const token = localStorage.getItem('access_token');
  if (!token) return 'public';
  try {
    const role = JSON.parse(atob(token.split('.')[1])).role;
    return role || 'public';
  } catch { return 'public'; }
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  role = computed(() => getRole());
}
