import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  addTopicMetadataForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  count = 0;
  ppp = "";
  fieldList = [];
  fieldListSubmit = [];
  topicId;

  ngOnInit(): void {
    this.count++;

    this.fieldListSubmit.push({
      id: this.count,
      tagId: "",
      text: "",
      img: "",
      isImg: false,
      isTextFieldAllowed: true,
    });

    //
    this.getAllTagsFunc();
    this.getAllTopicsFunc();

    //
    this.addTopicMetadataForm = this._formBuilder.group({
      topicId: new FormControl(""),
      tagId: new FormControl(""),
      text: new FormControl(""),
      img: new FormControl(""),
    });
  }

  onSubmit() {
    if (this.addTopicMetadataForm.invalid) {
      console.log("invalid for !...!");
      return;
    } else {
      console.log("form submited");
      let finalResponse = {
        topicId: this.topicId,
        fieldListSubmit: this.fieldListSubmit,
      };
      console.log("finalResponse");
      console.log(finalResponse);

      let addTopicMetadataFormUrl =
        "http://localhost:3000/topics-metadata/post-topic-metadata";
      this.http
        .post(addTopicMetadataFormUrl, finalResponse)
        .toPromise()
        .then((response) => {
          console.log("data submitted");
          console.log(response);
        })
        .catch((err: HttpErrorResponse) => {
          console.log("error occuer");
          console.log(err);
        });
    }
  }

  editingDataFunc(stringType, stringIdOrTextOrImg, rowId, selectedString) {
    console.log("editingDataFunc with stringValue: " + stringType);
    console.log("editingDataFunc with id/text: " + stringIdOrTextOrImg);
    console.log("editingDataFunc with rowId: " + rowId);
    console.log("editingDataFunc with selectedString: " + selectedString);

    if (stringType === "topic") {
      this.topicId = stringIdOrTextOrImg;
    } else {
      for (let i = 0; i < this.fieldListSubmit.length; i++) {
        if (this.fieldListSubmit[i].id === rowId) {
          if (stringType === "tag") {
            if (selectedString === "img") {
              console.log("selectedString is img");
              this.fieldListSubmit[i].isImg = true;
              this.fieldListSubmit[i].isTextFieldAllowed = false;
              this.fieldListSubmit[i].text = "";
            } else if (selectedString === "hr" || selectedString === "br") {
              this.fieldListSubmit[i].isTextFieldAllowed = false;
            } else {
              this.fieldListSubmit[i].isImg = false;
              this.fieldListSubmit[i].isTextFieldAllowed = true;
            }
            this.fieldListSubmit[i].tagId = stringIdOrTextOrImg;
          } else if (stringType === "text") {
            this.fieldListSubmit[i].text = stringIdOrTextOrImg;
            this.fieldListSubmit[i].isImg = false;
          } else if (stringType === "img") {
            console.log("fileEvent called");
            console.log(stringIdOrTextOrImg.files[0]);
            let filedata;
            filedata = stringIdOrTextOrImg.files[0];

            // var reader = new FileReader();
            // reader.readAsDataURL(stringIdOrTextOrImg.files[0]); // read file as data url

            this.fieldListSubmit[i].img = filedata;
          }
        }
      }
    }
    console.log("this.fieldListSubmit");
    console.log(this.fieldListSubmit);
  }

  addField() {
    this.count++;
    this.fieldListSubmit.push({
      id: this.count,
      tagId: "",
      text: "",
      img: "",
      isImg: false,
      isTextFieldAllowed: true,
    });
  }

  deleteField(id) {
    console.log("id in del: " + id);
    for (let i = 0; i < this.fieldListSubmit.length; i++) {
      if (this.fieldListSubmit[i].id == id) {
        this.fieldListSubmit.splice(i, 1);
      }
    }

    // this.fieldListSubmit = this.fieldListSubmit.filter((val) => val.id != id);
  }

  tagsArr;
  getAllTagsFunc() {
    let url = "http://localhost:3000/tags/get-all-tags";
    this.http
      .get(url)
      .toPromise()
      .then((response) => {
        let res;
        res = response;
        this.tagsArr = res.Response;
        return response;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error caught in getAllTagsFunc");
        console.log(err.status);
      });
  }

  topicsArr;
  getAllTopicsFunc() {
    let url = "http://localhost:3000/topics/get-all-topics";
    this.http
      .get(url)
      .toPromise()
      .then((response) => {
        let res;
        res = response;
        this.topicsArr = res.Response;
        return response;
      })
      .catch((err: HttpErrorResponse) => {
        console.log("error caught in getAllTagsFunc");
        console.log(err.status);
      });
  }
}
