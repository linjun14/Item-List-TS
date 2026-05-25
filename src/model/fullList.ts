import Item from './listItem';

interface List {
    list: Item[];

    load(): void;
    save(): void;
    clear(): void;
    addItem(item: Item): void;
    removeItem(id: string): void;
}

export default class FullList implements List {

    static instance: FullList = new FullList();

    private constructor(
        private _list: Item[] = []
    ) {}

    get list(): Item[] {
        return this._list;
    }

    public load(): void {
        const storedList: string | null = localStorage.getItem("myList");
        if (typeof storedList !== 'string') {
            return;
        }

        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList);

        parsedList.forEach(itemObj => {
            const newItem = new Item(itemObj._id, itemObj._item, itemObj._checked);
            FullList.instance.addItem(newItem);
        })

        
    }

    public save(): void {
        localStorage.setItem("myList", JSON.stringify(this._list))
    }

    public clear(): void {
        this._list = [];
        this.save();
    }

    public addItem(item: Item): void {
        this._list.push(item);
        this.save();
    }

    public removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
}