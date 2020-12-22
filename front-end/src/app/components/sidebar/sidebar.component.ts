import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SideMenuService } from "../../service/side-menu.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  // class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "dashboard" },
  { path: "/user-profile", title: "User Profile", icon: "person" },
  {
    path: "/table-list",
    title: "Table List",
    icon: "content_paste",
  },
  {
    path: "/typography",
    title: "Typography",
    icon: "library_books",
  },
  { path: "/icons", title: "Icons", icon: "bubble_chart" },
  { path: "/maps", title: "Maps", icon: "location_on" },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "notifications",
    // class: "",
  },
  {
    path: "/upgrade",
    title: "Upgrade to PRO",
    icon: "unarchive",
    // class: "active-pro",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private sideMenuItems: SideMenuService, private router: Router) {}

  ngOnInit() {
    let navItems = this.sideMenuItems.getSideMenuItems();
    console.log(navItems);
    //
    this.menuItems = navItems;
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  selectedOptionFunc(selectedTopicId,title) {
    console.log("selectedTopicId:: " + selectedTopicId);
    localStorage.setItem("title", title);
    localStorage.setItem("selectedTopicId", selectedTopicId);
    this.router
      .navigateByUrl("/sample", { skipLocationChange: true })
      .then(() => {
        this.router.navigate(["dashboard"]);
      });
  }
}
