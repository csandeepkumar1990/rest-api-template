import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { AppConstants } from '../utilities/AppConstants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class ContactService {

    constructor(public http: HttpClient, public cookieService: CookieService) { }

    getAllContacts(page, limit): Observable<any> {
        
        const getAllContactsUrl = AppConstants.GETALL_CONTACTS + '?page='+ page +'&limit=' +limit;
        return this.http
            .get(getAllContactsUrl, {})
            .pipe(map(
                res => {
                    return res;
                },
                err => {
                    return err;
                }
            ));
    }

    getContactDetails(contactId): Observable<any> {
        
        const URL = AppConstants.GET_CONTACT + '/' + contactId;
        return this.http
            .get(URL, {})
            .pipe(map(
                res => {
                    return res;
                },
                err => {
                    return err;
                }
            ));
    }

    createContact(data): Observable<any> {
        
        const URL = AppConstants.CREATE_CONTACT + '';
        return this.http
            .post(URL, data)
            .pipe(map(
                res => {
                    return res;
                },
                err => {
                    return err;
                }
            ));
    }

    updateContact(data): Observable<any> {
        
        const URL = AppConstants.UPDATE_CONTACT + '/' +data.id;
        return this.http
            .put(URL, data)
            .pipe(map(
                res => {
                    return res;
                },
                err => {
                    return err;
                }
            ));
    }

    deleteContact(contactId): Observable<any> {
        
        const URL = AppConstants.DELETE_CONTACT + '/' +contactId;
        return this.http
            .delete(URL, {})
            .pipe(map(
                res => {
                    return res;
                },
                err => {
                    return err;
                }
            ));
    }

}