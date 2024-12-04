import type {DropdownItem} from "#ui/types";

export type Menu = {
    id: number,
    name: string,
    url: string,
    children?: DropdownItem[][],
    component?: Component
};