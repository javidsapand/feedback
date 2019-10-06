import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleListCardComponent } from './module-list-card/module-list-card.component';
import { SubmoduleListCardComponent } from './submodule-list-card/submodule-list-card.component';
import { ContentListCardComponent } from './content-list-card/content-list-card.component';
import { QuizorexerciseListCardComponent } from './quizorexercise-list-card/quizorexercise-list-card.component';
import { ThreadListCardComponent } from './thread-list-card/thread-list-card.component';
import { ThreadDetailsComponent } from './thread-details/thread-details.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CourseListCardComponent} from './course-list-card/course-list-card.component';
import { InstructorListCardComponent } from './instructor-list-card/instructor-list-card.component';
import {ModuleListComponent} from './module-list/module-list.component';
import { VideoPlayerComponent } from './video-player/video-player.component';




import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';




@NgModule({
  declarations: [
    SubmoduleListCardComponent,
    ContentListCardComponent,
    QuizorexerciseListCardComponent,
    ThreadListCardComponent,
    ThreadDetailsComponent,
    HeaderComponent,
    FooterComponent,
    InstructorListCardComponent,
    CourseListCardComponent,
    ModuleListComponent,
    ModuleListCardComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  exports: [
    SubmoduleListCardComponent,
    ContentListCardComponent,
    QuizorexerciseListCardComponent,
    ThreadListCardComponent,
    ThreadDetailsComponent,
    HeaderComponent,
    FooterComponent,
    InstructorListCardComponent,
    CourseListCardComponent,
    ModuleListComponent,
    ModuleListCardComponent,
    VideoPlayerComponent
  ]
})
export class SharedModule { }
