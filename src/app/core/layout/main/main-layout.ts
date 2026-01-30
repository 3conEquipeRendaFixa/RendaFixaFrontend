import { Component, computed, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'srf-b3-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayout {
  private router = inject(Router);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects || e.url)
    ),
    { initialValue: this.router.url || '/' }
  );

  showMenuIcon = computed(() => {
    const url = this.currentUrl() || '/';
    let path = url.split('?')[0].split('#')[0];
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    const isMenu = path === '/' || path === '' || path.startsWith('/menu') || path.startsWith('#/menu');
    return !isMenu;
  });

  goToRoot(): void {
    this.router.navigate(['/']);
  }
}