import { Injectable } from "@angular/core";

import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SideMenuService {
  constructor(private http: HttpClient, private router: Router) {}

  sideMenuRes;
  sideMenuResArr;
  getSideMenuItems() {
    let itemsArr = [];
    let itemsArrTemp = [];

    this.http.get("http://localhost:3000/topics/get-all-topics").subscribe(
      (res) => {
        this.sideMenuRes = res;
        this.sideMenuResArr = this.sideMenuRes.Response;

        let childrenArrLevel1 = [];
        let childrenArrLevel2 = [];

        console.log("this.sideMenuResArr in side menu");
        console.log(this.sideMenuResArr);
        for (let i = 0; i < this.sideMenuResArr.length; i++) {
          if (this.sideMenuResArr[i].pId === 0) {
            for (let j = 0; j < this.sideMenuResArr.length; j++) {
              if (this.sideMenuResArr[j].pId == this.sideMenuResArr[i].id) {
                for (let k = 0; k < this.sideMenuResArr.length; k++) {
                  if (this.sideMenuResArr[k].pId == this.sideMenuResArr[j].id) {
                    childrenArrLevel2.push({
                      id: this.sideMenuResArr[k].id,
                      title: this.sideMenuResArr[k].name,
                      path: "/dashboard",
                    });
                  }
                }

                if (childrenArrLevel2.length > 0) {
                  childrenArrLevel1.push({
                    id: this.sideMenuResArr[j].id,
                    title: this.sideMenuResArr[j].name,
                    path: "/dashboard",
                    children: childrenArrLevel2,
                  });
                } else {
                  childrenArrLevel1.push({
                    id: this.sideMenuResArr[j].id,
                    title: this.sideMenuResArr[j].name,
                    path: "/dashboard",
                    children: [],
                  });
                }
                childrenArrLevel2 = [];
              }
            }

            if (childrenArrLevel1.length > 0) {
              itemsArrTemp.push({
                id: this.sideMenuResArr[i].id,
                title: this.sideMenuResArr[i].name,
                path: "/dashboard",
                children: childrenArrLevel1,
              });
            } else {
              itemsArrTemp.push({
                id: this.sideMenuResArr[i].id,
                title: this.sideMenuResArr[i].name,
                path: "/dashboard",
                children: [],
              });
            }
            childrenArrLevel1 = [];
            itemsArr.push({
              id: this.sideMenuResArr[i].id,
              title: this.sideMenuResArr[i].name,
              path: "/dashboard",
              children: itemsArrTemp[0].children,
            });
            itemsArrTemp = [];
          }
        }

        // console.log("itemsArr final array: ");
        // console.log(itemsArr);
      },
      (err) => {
        console.log("else case while getting all the topics");
        console.log(err);
      }
    );

    /*     let itemsArrStatic = [
      {
        name: "Database",
        url: "/pages",
        children: [
          {
            name: "Login",
            url: "/login",
          },
          {
            name: "Error 404",
            url: "/404",
          },
        ],
      },
      {
        name: "JS",
        url: "/dashboard",
        children: [
          {
            name: "Login",
            url: "/login",
          },
          {
            name: "Error 404",
            url: "/404",
          },
        ],
      },
    ]; */
    return itemsArr;
  }
}
