import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IProduct } from "../interfaces/products.interfaces";
import { INotification } from "../interfaces/notification.interfaces";

@Injectable({ providedIn: 'root' })
export class NotificationService {
    public notification$ = new Subject<INotification>();

    textNotice(text: string) {
        this.notification$.next({ type: 'text', text })
    }

    productNotice(text: string, product: IProduct) {
        this.notification$.next({ type: 'product', text, product })
    }
}