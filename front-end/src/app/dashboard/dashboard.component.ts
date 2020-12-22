import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { Router } from "@angular/router";

// import { TopicMetadataService } from "../service/topic-metadata.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  title =  localStorage.getItem("title");

  constructor(
    // private topicMetadataService: TopicMetadataService,


    private router: Router,
    private http: HttpClient
  ) {}
  topicMetadata = [];
  resObj;
  jsonObjNew = "";

  metadataJsonFunc(topicMetadataObj) {
    for (let i = 0; i < topicMetadataObj[0].topic_metadata.length; i++) {
      let topicMetadata = topicMetadataObj[0].topic_metadata[i];
      console.log("00000000000    " + i);
      console.log(topicMetadata);
      // if(topicMetadata.image !== null) {
      //   this.jsonObjNew = this.jsonObjNew + "<center><a href='" + topicMetadata.image + "' target='_self'> <img src=" + topicMetadata.image + " width='400px' height='400px' /></a></center>"
      // }
      if (topicMetadata.tag.name === "h1") {
        this.jsonObjNew =
          this.jsonObjNew + " " + "<h1>" + topicMetadata.value + "</h1>";
      } else if (topicMetadata.tag.name === "h2") {
        this.jsonObjNew =
          this.jsonObjNew + "<h2>" + topicMetadata.value + "</h2>";
      } else if (topicMetadata.tag.name === "h3") {
        this.jsonObjNew =
          this.jsonObjNew + "<h3>" + topicMetadata.value + "</h3>";
      } else if (topicMetadata.tag.name === "h4") {
        this.jsonObjNew =
          this.jsonObjNew + "<h4>" + topicMetadata.value + "</h4>";
      } else if (topicMetadata.tag.name === "h5") {
        this.jsonObjNew =
          this.jsonObjNew + "<h5>" + topicMetadata.value + "</h5>";
      } else if (topicMetadata.tag.name === "h6") {
        this.jsonObjNew =
          this.jsonObjNew + "<h6>" + topicMetadata.value + "</h6>";
      } else if (topicMetadata.tag.name === "p") {
        this.jsonObjNew =
          this.jsonObjNew + "<p>" + topicMetadata.value + "</p>";
      } else if (topicMetadata.tag.name === "title") {
        this.jsonObjNew =
          this.jsonObjNew + "<h2>" + topicMetadata.value + "</h2>";
      } else if (topicMetadata.tag.name === "hr") {
        this.jsonObjNew = this.jsonObjNew + "<hr>";
      } else if (topicMetadata.tag.name === "br") {
        // have to work on it.
      } else if (topicMetadata.tag.name === "img") {
        this.jsonObjNew = this.jsonObjNew + "<a href='" + topicMetadata.value + "' target='_self' ><img src='" + topicMetadata.value + "' width='400px' height='400px' /></a>";
      }
    }
  }

  getTopicMetadataFunc(topicId) {
    let url = "http://localhost:3000/topics/get-topic-metadata";
    this.http
      .get(url, {
        params: {
          topicId: topicId,
        },
      })
      .toPromise()
      .then((response) => {
        this.resObj = response;
        this.topicMetadata.push(this.resObj.Response[0]);
        this.metadataJsonFunc(this.topicMetadata);
        return response;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error caught in getTopicMetadataFunc");
        console.log(err.status);
      });
  }

  async ngOnInit() {
    let selectedTopicId = localStorage.getItem("selectedTopicId");

    if (selectedTopicId == null) {
    } else {
      await this.getTopicMetadataFunc(selectedTopicId);
    }
  }
}
