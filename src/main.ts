import './css/style.css'
import FullList from './model/fullList';
import listItem from './model/listItem';
import DOMItemList from './templates/listTemplate';

const initApp = (): void => {
    const fullList = FullList.instance;
    const template = DOMItemList.instance;

    const itemForm = document.getElementById("input-form") as HTMLFormElement;
    itemForm.addEventListener("submit", (event: SubmitEvent):void => {

        event.preventDefault();

        const input = document.getElementById("search-box") as HTMLInputElement;
        const newText = input.value.trim();

        if (newText.length === 0) {
            return;
        }

        const itemID = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;
        const newItem = new listItem(itemID.toString(), newText, false);

        fullList.addItem(newItem);
        template.render(fullList);
    })

    const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;;
    clearBtn.addEventListener("click", (): void => {
        fullList.clear();
        template.clear();
    })

    fullList.load();
    template.render(fullList);
}

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});