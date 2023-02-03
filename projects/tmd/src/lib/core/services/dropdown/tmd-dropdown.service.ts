import { Injectable } from "@angular/core";
import { SelectComponent } from "../../../components/dropdown/select/select.component";

@Injectable({
    providedIn: 'root'
})
export class TmdDropDownService {
    private dropDownComponent!: SelectComponent;

    register(select: SelectComponent) {
        this.dropDownComponent = select;
    }

    getSelect(): SelectComponent {
        return this.dropDownComponent;
    }
}