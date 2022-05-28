import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;
  objResponse: any = {};
  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.loginPopup()
      .subscribe({
        next: (result) => {
          console.log(result);
          this.objResponse = result;
          this.setLoginDisplay();
        },
        error: (error) => console.log(error)
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }


  logout() {
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
    });
  }
}
