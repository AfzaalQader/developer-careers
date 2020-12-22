import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TopicMetadataService {
  constructor(private http: HttpClient) {}
  res;
  // Getting Topic-Metadata json.
  getTopicMetadataFunc(topicId) {
    // this.http
    //   .get("http://localhost:3000/topics/get-topic-metadata?topicId=" + topicId)
    //   .subscribe(
    //     (res) => {
    //       console.log("getTopicMetadataFunc res in service");
    //       console.log(res);
    //       return res[0];
    //     },
    //     (err) => {
    //       console.log("else case while getting etting Topic-Metadat json");
    //       console.log(err);
    //       return err;
    //     }
    //   );

    //

    // let url = "http://localhost:3000/topics/get-topic-metadata";
    // this.http
    //   .get(url, {
    //     params: {
    //       topicId: topicId,
    //     },
    //   })
    //   .toPromise()
    //   .then((response) => {
    //     console.log("Current Chat");
    //     console.log(response);
    //     this.res = response;
    //     return response;
    //   })
    //   .catch((err: HttpErrorResponse) => {
    //     console.log("error caught");
    //     console.log(err.status);
    //   });

    return "this.res";
  }
}
