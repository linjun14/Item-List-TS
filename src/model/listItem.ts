export interface Item {
    id: string,
    item: string,
    checked: boolean
}

export default class ListItem implements Item {

    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = true
    ) {
        
    }

    get id(): string {
        return this._id;
    }

    set id(new_id: string) {
        this._id = new_id;
    }

    get item(): string {
        return this._item;
    }

    set item(new_item: string) {
        this._id = new_item;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(state: boolean) {
        this._checked = state;
    }

}