import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VgAPI } from 'videogular2/compiled/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  videoApi: VgAPI;
  constructor() { }

  ngOnInit() {
  }


  onPlayerReady(api: VgAPI) {
    this.videoApi = api;
  }

}
