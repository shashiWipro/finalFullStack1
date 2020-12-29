import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }
}
