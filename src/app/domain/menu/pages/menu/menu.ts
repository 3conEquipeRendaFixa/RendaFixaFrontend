import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon: string;
  dataModule?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  link?: string;
  submenu?: { label: string; link?: string }[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {
  activeDropdown = signal<number | null>(null);
  highlightedModules = signal<string[]>([]);

  modulesRow1: MenuItem[] = [
    {
      label: 'Cadastro de Clientes',
      icon: 'icons/Vector.svg',
      dataModule: 'cadastro-clientes'
    },
    {
      label: 'Cadastro de Ativos',
      icon: 'icons/Vector.svg',
      submenu: [
        { label: 'Títulos Públicos', link: '/asset-registration/public-securities' },
        { label: 'Títulos Privados', link: '/asset-registration/private-securities'},
        { label: 'Agenda de Eventos', link: '#' }
      ]
    },
    {
      label: 'Operações e Custódia',
      icon: 'icons/Check.svg',
      submenu: [
        { label: 'Gestão de Operações', link: '#' },
        { label: 'Custódia', link: '#' }
      ]
    },
    {
      label: 'Financeiro',
      icon: 'icons/attach_money.svg',
      submenu: [
        { label: 'Liquidação de Eventos', link: '#' },
        { label: 'Lançamentos C.Corrente', link: '#' }
      ]
    },
    {
      label: 'Conciliação',
      icon: 'icons/Conciliação.svg',
      dataModule: 'conciliacao'
    }
  ];

  modulesRow2: MenuItem[] = [
    {
      label: 'Administrativo',
      icon: 'icons/Administrativo.svg',
      submenu: [
        { label: 'Calendário por Praça', link: '/calendar' },
        {
          label: 'Parâmetros',
          submenu: [
            { label: 'Parâmetros do Sistema', link: '#' },
            { label: 'Parâmetros de Negócio', link: '#' }
          ]
        }
      ]
    },
    {
      label: 'Tributos',
      icon: 'icons/tributos.svg',
      dataModule: 'tributos'
    },
    {
      label: 'Comissão e Corretagem',
      icon: 'icons/comissão-e-corretagem.svg',
      submenu: [
        { label: 'Regras', link: '#' },
        { label: 'Apuração', link: '#' }
      ]
    },
    {
      label: 'Precificação',
      icon: 'icons/precificação.svg',
      submenu: [
        { label: 'Regras', link: '#' },
        { label: 'Histórico de Preços', link: '#' }
      ]
    },
    {
      label: 'Relatórios',
      icon: 'icons/relatórios.svg',
      dataModule: 'relatorios'
    }
  ];

  toggleDropdown(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.activeDropdown() === index) {
      this.activeDropdown.set(null);
    } else {
      this.activeDropdown.set(index);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.module-dropdown')) {
      this.activeDropdown.set(null);
    }
  }

  onRelatoriosClick(event: Event): void {
    event.preventDefault();
    const modulesToHighlight = ['cadastro-clientes', 'tributos', 'conciliacao'];
    this.highlightedModules.set(modulesToHighlight);

    setTimeout(() => {
      this.highlightedModules.set([]);
    }, 1500);
  }

  isHighlighted(dataModule: string | undefined): boolean {
    return dataModule ? this.highlightedModules().includes(dataModule) : false;
  }

  hasSubmenu(item: SubMenuItem): boolean {
    return !!item.submenu && item.submenu.length > 0;
  }
}
