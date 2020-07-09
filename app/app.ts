import { module, element, bootstrap } from 'angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import './app.less';

export let app = module('app', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider.state(
            {
                name: 'home',
                url: '/home',
                component: HomeComponent.NAME
            });

        $urlRouterProvider.otherwise('/home');
    }])
    .component(AppComponent.NAME, new AppComponent())
    .component(HomeComponent.NAME, new HomeComponent());

element(document).ready( () => {
    bootstrap(document, ['app']);
});
