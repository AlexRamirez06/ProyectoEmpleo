import { Component, inject, signal, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs/operators';
import { BrandComponent } from '../core/components/brand.component';

interface MenuItem {
  path: string;
  exact: boolean;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, BrandComponent],
  template: `
    <!-- Enlace saltar al contenido -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn btn-primary">
      Saltar al contenido principal
    </a>

    <div class="min-h-screen flex bg-gray-50 text-text-main">
      
      <!-- Scrim móvil -->
      @if (drawerOpen()) {
        <div 
          class="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
          (click)="closeDrawer()"
          aria-hidden="true"
        ></div>
      }

      <!-- Sidebar / Drawer -->
      <aside 
        class="fixed lg:static inset-y-0 left-0 z-40 bg-primary-900 text-white flex flex-col transition-all duration-300 ease-in-out transform motion-reduce:transition-none"
        [ngClass]="[
          drawerOpen() ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0',
          isCollapsed() ? 'lg:w-20' : 'lg:w-[260px]',
          'w-[260px]'
        ]"
        (keydown.escape)="closeDrawer()"
        role="navigation"
        aria-label="Menú principal"
      >
        <!-- Header del Menú -->
        <div class="h-16 flex items-center px-4 shrink-0" [ngClass]="isCollapsed() ? 'justify-center' : 'justify-between'">
          <div [ngClass]="isCollapsed() ? 'scale-75' : ''" class="transition-transform duration-300 origin-left">
            <app-brand [lightText]="true"></app-brand>
          </div>
          
          <!-- Botón contraer (Solo escritorio) -->
          <button 
            type="button" 
            class="hidden lg:flex w-8 h-8 rounded-md items-center justify-center text-primary-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 group"
            (click)="toggleCollapse()"
            [attr.aria-label]="isCollapsed() ? 'Expandir menú' : 'Contraer menú'"
            [attr.title]="isCollapsed() ? 'Expandir menú' : 'Contraer menú'"
          >
            <svg class="w-5 h-5 transition-transform duration-300 motion-reduce:transition-none" [ngClass]="isCollapsed() ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <!-- Lista de enlaces -->
        <div class="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
          <ul class="relative space-y-2">
            <!-- Indicador de ítem activo -->
            @if (activeIndex() !== -1) {
              <div 
                class="absolute left-0 w-1 h-8 bg-white rounded-r-full transition-transform duration-300 ease-out z-10 motion-reduce:transition-none"
                [style.transform]="'translateY(' + (activeIndex() * 52 + 6) + 'px)'"
              ></div>
              <div 
                class="absolute inset-x-0 h-11 bg-white/10 rounded-lg transition-transform duration-300 ease-out z-0 motion-reduce:transition-none"
                [style.transform]="'translateY(' + (activeIndex() * 52) + 'px)'"
              ></div>
            }

            @for (item of menuItems; track item.path; let i = $index) {
              <li class="relative z-10 h-11">
                <a 
                  [routerLink]="item.path" 
                  class="flex items-center gap-3 px-3 w-full h-full rounded-lg text-primary-100 hover:text-white hover:bg-white/5 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                  [attr.aria-current]="activeIndex() === i ? 'page' : null"
                  [title]="isCollapsed() ? item.label : ''"
                  (click)="onMenuClick()"
                >
                  <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" [innerHTML]="item.icon"></svg>
                  
                  <span 
                    class="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis transition-opacity duration-300 motion-reduce:transition-none" 
                    [ngClass]="[
                      activeIndex() === i ? 'text-white' : '',
                      isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                    ]"
                  >
                    {{ item.label }}
                  </span>
                </a>
              </li>
            }
          </ul>
        </div>

        <!-- Bloque de usuario (Pie del menú) -->
        <div class="p-4 border-t border-primary-800 shrink-0">
          <button 
            type="button"
            class="flex items-center gap-3 w-full text-left rounded-lg p-2 -mx-2 hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 relative"
            [title]="isCollapsed() ? 'Usuario de ejemplo' : ''"
            (click)="toggleUserMenu()"
            [attr.aria-expanded]="userMenuOpen()"
            aria-haspopup="true"
          >
            <div class="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center shrink-0 font-bold text-sm">
              UE
            </div>
            <div 
              class="flex-1 min-w-0 transition-opacity duration-300 motion-reduce:transition-none"
              [ngClass]="isCollapsed() ? 'opacity-0 w-0' : 'opacity-100 w-auto'"
            >
              <p class="text-sm font-medium truncate text-white">Usuario de ejemplo</p>
              <p class="text-xs text-primary-300 truncate">Administrador</p>
            </div>
          </button>

          <!-- Menú desplegable de usuario -->
          @if (userMenuOpen()) {
            <div 
              class="absolute bottom-16 left-4 bg-white rounded-lg shadow-xl border border-gray-100 py-1 w-48 z-50 text-text-main animate-slide-in-right motion-reduce:animate-none"
              [ngClass]="isCollapsed() ? 'left-16' : 'left-4 w-[calc(100%-2rem)]'"
            >
              <a routerLink="/admin/empresa" class="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-primary-600 font-medium transition-colors" (click)="userMenuOpen.set(false)">Mi empresa</a>
              <div class="h-px bg-gray-100 my-1"></div>
              <a routerLink="/admin/login" class="block px-4 py-2 text-sm hover:bg-gray-50 text-red-600 font-medium transition-colors" (click)="userMenuOpen.set(false)">Cerrar sesión</a>
            </div>
          }
        </div>
      </aside>

      <!-- Contenido principal -->
      <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        
        <!-- Barra superior -->
        <header class="h-16 bg-white border-b border-gray-200 shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20">
          
          <div class="flex items-center gap-4">
            <!-- Hamburguesa móvil -->
            <button 
              type="button" 
              class="lg:hidden p-2 -ml-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-focus)]"
              (click)="openDrawer()"
              aria-label="Abrir menú"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <!-- Título de la sección -->
            <h1 class="text-xl sm:text-2xl font-bold text-text-main truncate" id="main-content">
              {{ currentTitle() }}
            </h1>
          </div>

          <div class="flex items-center gap-3">
            <a routerLink="/admin/plazas" class="btn btn-primary btn-sm" data-motion="add">
              <svg class="btn__icon w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline">Nueva plaza</span>
              <span class="sr-only sm:hidden">Nueva plaza</span>
            </a>
            
            <div class="hidden sm:block w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-sm ml-2 ring-2 ring-white">
              UE
            </div>
          </div>
        </header>

        <!-- Área desplazable del contenido -->
        <main class="flex-1 overflow-auto bg-gray-50 p-4 sm:p-6 lg:p-8 relative">
          <div class="max-w-7xl mx-auto w-full">
            <!-- Transición de ruta -->
            <div class="transition-all duration-200 ease-out motion-reduce:transition-none" [ngClass]="isNavigating() ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'">
              <router-outlet></router-outlet>
            </div>
          </div>
        </main>

      </div>
    </div>
  `
})
export class AdminLayoutComponent implements OnInit {
  private router = inject(Router);

  isCollapsed = signal(false);
  drawerOpen = signal(false);
  userMenuOpen = signal(false);
  activeIndex = signal(0);
  currentTitle = signal('Panel');
  isNavigating = signal(false);

  menuItems: MenuItem[] = [
    { path: '/admin', exact: true, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>', label: 'Panel' },
    { path: '/admin/plazas', exact: false, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>', label: 'Plazas' },
    { path: '/admin/candidatos', exact: false, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>', label: 'Candidatos por plaza' },
    { path: '/admin/bolsa-de-talento', exact: false, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>', label: 'Bolsa de talento' },
    { path: '/admin/empresa', exact: false, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1v1H9V7zm5 0h1v1h-1V7zm-5 4h1v1H9v-1zm5 0h1v1h-1v-1zm-3 4H2v4h15v-4z"/>', label: 'Mi empresa' }
  ];

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateActiveItem(event.urlAfterRedirects);
      
      // Simular transición de carga leve
      this.isNavigating.set(true);
      setTimeout(() => this.isNavigating.set(false), 200);
      
      // Cerrar menús al navegar
      this.drawerOpen.set(false);
      this.userMenuOpen.set(false);
    });
  }

  ngOnInit() {
    const saved = localStorage.getItem('admin_menu_collapsed');
    if (saved === 'true') {
      this.isCollapsed.set(true);
    }
    this.updateActiveItem(this.router.url);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.userMenuOpen() && !target.closest('.p-4.border-t')) {
      this.userMenuOpen.set(false);
    }
  }

  updateActiveItem(url: string) {
    const urlWithoutQuery = url.split('?')[0].split('#')[0];
    
    // Reverse loop para que rutas más específicas hagan match primero
    let foundIndex = -1;
    for (let i = this.menuItems.length - 1; i >= 0; i--) {
      const item = this.menuItems[i];
      if (item.exact) {
        if (urlWithoutQuery === item.path) {
          foundIndex = i;
          break;
        }
      } else {
        if (urlWithoutQuery.startsWith(item.path)) {
          foundIndex = i;
          break;
        }
      }
    }
    
    if (foundIndex !== -1) {
      this.activeIndex.set(foundIndex);
      this.currentTitle.set(this.menuItems[foundIndex].label);
    }
  }

  toggleCollapse() {
    const newVal = !this.isCollapsed();
    this.isCollapsed.set(newVal);
    localStorage.setItem('admin_menu_collapsed', newVal.toString());
    if (newVal) this.userMenuOpen.set(false);
  }

  openDrawer() {
    this.drawerOpen.set(true);
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }

  toggleUserMenu() {
    this.userMenuOpen.set(!this.userMenuOpen());
  }

  onMenuClick() {
    if (window.innerWidth < 1024) {
      this.closeDrawer();
    }
  }
}
