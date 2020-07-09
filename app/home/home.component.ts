import './home.less';

export interface ISelection {
    section: string;
    permission: IPermission;
}

export interface IPermission {
    view: boolean;
    edit: boolean;
    remove: boolean;
}

class HomeController implements ng.IController {

    sectionList: Array<ISelection>;
    isAllCheckedView: boolean;
    isAllCheckedEdit: boolean;
    isAllCheckedRemove: boolean;
    isDisabledEditAll: boolean;
    isDisabledRemoveAll: boolean;

    constructor() {
        this.isAllCheckedView = false;
        this.isAllCheckedEdit = false;
        this.isAllCheckedRemove = false;
        this.isDisabledEditAll = true;
        this.isDisabledRemoveAll = true;

        this.sectionList = [
            {
                section: 'calendar',
                permission: {
                    view: false,
                    edit: false,
                    remove: false
                }
            },
            {
                section: 'profile',
                permission: {
                    view: false,
                    edit: false,
                    remove: false
                }
            },
            {
                section: 'property',
                permission: {
                    view: false,
                    edit: false,
                    remove: false
                }
            },
            {
                section: 'contacts',
                permission: {
                    view: false,
                    edit: false,
                    remove: false
                }
            }
        ];
    }

    onSave(sectionList) {
        localStorage.setItem('data', JSON.stringify(sectionList));
    }

    onCheckUncheckHeader(key, isAllChecked, isDisabled) {
        this.sectionList.forEach(item => {
            if (!item.permission[key]) {
                this[isAllChecked] = false;
            }
        });
        this.checkDisabled(key, isDisabled);
    }

    onCheckUncheckAll(key, isAllChecked) {
        this.sectionList.forEach(item => {
            item.permission[key] = this[isAllChecked];
        });
    }

    checkDisabled(key, isDisabled) {
        if (!!isDisabled) {
            let check = 0;
            this.sectionList.forEach(item => {
                if (item.permission[key]) {
                    check++;
                }
                this[isDisabled] = !check;
            });
        }
    }
}

export class HomeComponent implements ng.IComponentOptions {
    static NAME: string = 'homeView';
    controller: any;
    templateUrl: any;

    constructor() {
        this.controller = HomeController;
        this.templateUrl = require('./home.html');

    }
}
