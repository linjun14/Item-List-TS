import FullList from '../model/fullList'

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(list: FullList): void;
}

export default class DOMItemList implements DOMList {

    ul: HTMLUListElement

    static instance: DOMItemList = new DOMItemList();

    private constructor() {
        this.ul = document.getElementById("item-list") as HTMLUListElement 
    }

    public clear(): void {
        this.ul.innerHTML = "";
    }

    public render(fullList: FullList) {
        this.clear();

        fullList.list.forEach(item => {
            let i: number = 0;
            const listItemBox = document.createElement("li") as HTMLLIElement;
            const listItem = document.createElement("div") as HTMLDivElement;
            const inputBox = document.createElement("input") as HTMLInputElement;
            const label = document.createElement("label") as HTMLLabelElement;
            const btn = document.createElement("btn") as HTMLButtonElement;

            listItemBox.className = "list-item";

            inputBox.type = "checkbox";
            inputBox.id = item.id;
            label.htmlFor = item.id;
            label.textContent = item.item;

            inputBox.addEventListener("change", () => {
                item.checked = !item.checked;
                fullList.save();
            });

            btn.classList.add("btn");
            btn.classList.add("del-btn");
            btn.textContent = "X";

            listItem.appendChild(inputBox);
            listItem.appendChild(label);

            listItemBox.appendChild(listItem);
            listItemBox.appendChild(btn);

            btn.addEventListener("click", () => {
                fullList.removeItem(item.id);
                this.render(fullList);
            })
        });
    }
}