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

    /**
     *   Send data in localStorage
     *
     * @param sectionList - array sections this permissions
     */

    onSave(sectionList: Array<ISelection>): void {
        localStorage.setItem('data', JSON.stringify(sectionList));
    }

    /**
     * Checking all boxes into body of table
     *
     * @param key - name to get state of the permission;
     * @param isAllChecked - name to get state of CheckAll into column
     * @param isDisabled - name to get state of disable on CheckAll
     */

    onCheckUncheckHeader(key: string, isAllChecked: string, isDisabled: string): void {
        this.sectionList.forEach(item => {
            if (!item.permission[key]) {
                this[isAllChecked] = false;
            }
        });
        this.checkDisabled(key, isDisabled);
    }

    /**
     * Check or Uncheck all boxes when use header checkbox
     *
     * @param key - name to get state of the permission;
     * @param isAllChecked - name to get state of all boxes permission
     */

    onCheckUncheckAll(key: string, isAllChecked: string): void {
        this.sectionList.forEach(item => {
            item.permission[key] = this[isAllChecked];
        });
    }

    /**
     * set disable state to header checkbox
     *
     * @param key - name to get state of the permission;
     * @param isDisabled - name to get state of disable on CheckAll
     */

    checkDisabled(key: string, isDisabled: string): void {
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
