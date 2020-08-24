import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FetchdataService {

	constructor(private http: HttpClient) { }


	getBrand(id): Observable<any> {

		return this.http.get(environment.url + 'single_brand.php?bid=' + id)
	}

	getCart(id): Observable<any> {

		return this.http.get(environment.url + 'getcart.php?id=' + id)
	}
	getCartCheckout(id): Observable<any> {

		return this.http.get(environment.url + 'checkout.php?cid=' + id)
	}

	getShippingZones(): Observable<any> {

		return this.http.get(environment.url + 'shipping_zones.php')
	}

	getOrderByEmail(val): Observable<any> {

		return this.http.get(environment.url + 'cart_order.php?email=' + val)
	}
	getOrderByUser(val): Observable<any> {

		return this.http.get(environment.url + 'cart_order.php?uid=' + val)
	}
	getOrderById(val): Observable<any> {

		return this.http.get(environment.url + 'get_order.php?oid=' + val)
	}

	getPaymentMethods(val): Observable<any> {

		return this.http.get(environment.url + 'get_payment_methods.php?oid=' + val)
	}

	getProductsByOrderId(val): Observable<any> {

		return this.http.get(environment.url + 'order_products.php?url=' + val)
	}

	createPaymentToken(val): Observable<any> {

		return this.http.post(environment.url + 'create_payment_token.php', val)
	}

	processPayment(val, token): Observable<any> {

		return this.http.post(environment.url + 'process_payment.php?token=' + token, val)
	}

	getAllcustomers(): Observable<any> {

		return this.http.get(environment.url + 'get_all_customers.php')
	}

	updateuser(userdata: any) {

		let id = userdata.id;
		delete userdata.id;
		return this.http.put(environment.url + 'updateuser.php?uid=' + id, userdata)
	}
	
	updateuser_token(userdata: any) {


		return this.http.put(environment.url + 'update_push_token.php', userdata)
	}

	changepassword(userdata: any): Observable<any> {

		let id = userdata.id;
		delete userdata.id;
		return this.http.put(environment.url + 'change_password.php?id=' + id, userdata)
	}

	addData(data: any): Observable<any> {

		return this.http.post(environment.url + 'leads/addData', data)
	}

	getallWishList(id: any): Observable<any> {
		return this.http.get(environment.url + 'get_all_wishlist.php?customer_id=' + id)
	}
	showallWishList(id: number): Observable<any> {

		return this.http.get(environment.url + 'wishlist_product.php?customer_id=' + id)
	}

	deleteWishList(id: number): Observable<any> {

		return this.http.delete(environment.url + 'deletewishlist.php?id=' + id)
	}

}

