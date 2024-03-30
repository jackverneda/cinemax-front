import { Injectable } from '@angular/core';
// import { LoggedInUserService } from '../loggedInUser/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navBackend: any[];

  constructor() {
    // private loggedInUserService: LoggedInUserService
    // let user = this.loggedInUserService.getLoggedInUser();

    this.navBackend = [
      {
        id: 'tickets',
        displayName: 'Entradas',
        iconName: ['local_activity'],
        route: 'backend/tickets',
        material: true,
        children: [],
        role: [0],
        hasPermission: true,
      },
      {
        id: 'movies',
        displayName: 'Películas',
        iconName: ['movie_edit'],
        route: 'backend/movies',
        material: true,
        children: [
          {
            id: 'genres',
            displayName: 'Géneros de Películas',
            iconName: ['theater_comedy'],
            route: 'backend/genres',
            material: true,
            children: [],
            role: [0],
            hasPermission: true,
          },
          {
            id: 'movies',
            displayName: 'Películas',
            iconName: ['movie'],
            route: 'backend/movies',
            material: true,
            children: [],
            role: [0],
            hasPermission: true,
          },
          {
            id: 'actors',
            displayName: 'Actores',
            iconName: ['groups_3'],
            route: 'backend/actors',
            material: true,
            children: [],
            role: [0],
            hasPermission: true,
          },
          {
            id: 'directors',
            displayName: 'Directores',
            iconName: ['people'],
            route: 'backend/directors',
            material: true,
            children: [],
            role: [0],
            hasPermission: true,
          },
          {
            id: 'country',
            displayName: 'Países',
            iconName: ['public'],
            route: 'backend/country',
            material: true,
            children: [],
            role: [0],
            hasPermission: true,
          },
        ],
        role: [0],
        hasPermission: true,
      },
      {
        id: 'Room',
        displayName: 'Salas',
        iconName: ['event_seat'],
        route: 'backend/movies',
        material: true,
        children: [
          {
            id: 'movies',
            displayName: 'Tipo de Sala',
            iconName: ['event_seat'],
            route: 'backend/rooms',
            material: true,
            role: [0],
            hasPermission: true,
          },
          {
            id: 'rooms',
            displayName: 'Salas',
            iconName: ['event_seat'],
            route: 'backend/rooms',
            material: true,
            role: [0],
            hasPermission: true,
          },
        ],
        role: [0],
        hasPermission: true,
      },
      {
        id: 'event',
        displayName: 'Proyección',
        iconName: ['theater_comedy'],
        route: 'backend/event',
        material: true,
        children: [],
        role: [0],
        hasPermission: true,
      },
      //   {
      //     id: 'mi-perfil',
      //     displayName: 'Mi perfil',
      //     iconName: ['account_circle'],
      //     route: 'backend/profile',
      //     material: true,
      //     children: [],
      //     role: [0],
      //     hasPermission: true,
      //   },
      //   {
      //     id: 'mis-aplicaciones',
      //     displayName: 'Mis aplicaciones',
      //     iconName: ['apps'],
      //     route: 'backend/client-service',
      //     material: true,
      //     children: [],
      //     role: [0],
      //     hasPermission: true,
      //   },
      {
        id: 'usuarios',
        displayName: 'Usuarios',
        iconName: ['people'],
        route: 'backend/users',
        material: true,
        children: [],
        role: [0],
        hasPermission: true,
      },
      //   {
      //     id: 'registros',
      //     displayName: 'Registros',
      //     iconName: ['settings'],
      //     route: 'backend/logs',
      //     material: true,
      //     children: [],
      //     role: [0],
      //     hasPermission: true,
      //   },
      //   {
      //     id: 'configuracion',
      //     displayName: 'Configuración',
      //     iconName: ['history'],
      //     route: 'backend/configuration',
      //     material: true,
      //   },
    ];
  }

  public getNavBackend() {
    return [...this.navBackend];
  }
}
