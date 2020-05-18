import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { PodcastModel } from '../model/podcast.model';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public commonChartFeatures = {
    option: {
      responsive: true,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            min: 0
          }
        }]
      }
    },
    legend: true,
    type: 'line'
  };

  public chartYearPodcast = {
    dataset: [{ data: [], label: 'Podcast Sayısı' }],
    label: [],
    option: this.commonChartFeatures.option,
    color: [{ backgroundColor: 'rgba(171,21,0,0.40)', borderColor: 'rgba(171,21,0,0.50)' }],
    legend: this.commonChartFeatures.legend,
    type: this.commonChartFeatures.type
  };

  public chartYearContent = {
    dataset: [{ data: [], label: 'Konu Sayısı' }],
    label: [],
    option: this.commonChartFeatures.option,
    color: [{ backgroundColor: 'rgba(171,210,0,0.40)', borderColor: 'rgba(171,210,0,0.50)' }],
    legend: this.commonChartFeatures.legend,
    type: this.commonChartFeatures.type
  };

  public chartYearLink = {
    dataset: [{ data: [], label: 'Link Sayısı' }],
    label: [],
    option: this.commonChartFeatures.option,
    color: [{ backgroundColor: 'rgba(17,21,0,0.40)', borderColor: 'rgba(17,21,0,0.50)' }],
    legend: this.commonChartFeatures.legend,
    type: this.commonChartFeatures.type
  };

  public chartYearVideo = {
    dataset: [{ data: [], label: 'Video Sayısı' }],
    label: [],
    option: this.commonChartFeatures.option,
    color: [{ backgroundColor: 'rgba(1,210,0,0.40)', borderColor: 'rgba(1,210,0,0.50)' }],
    legend: this.commonChartFeatures.legend,
    type: this.commonChartFeatures.type
  };

  public chartYearExplanation = {
    dataset: [{ data: [], label: 'Açıklama Sayısı' }],
    label: [],
    option: this.commonChartFeatures.option,
    color: [{ backgroundColor: 'rgba(17,17,200,0.40)', borderColor: 'rgba(17,17,200,0.50)' }],
    legend: this.commonChartFeatures.legend,
    type: this.commonChartFeatures.type
  };

  public podcastList: Array<PodcastModel> = new Array<PodcastModel>();

  public display = {
    isLoading: false,
    totalPodcast: 0,
    totalContent: 0,
    totalContentLink: 0,
    totalPodcastWithVideo: 0,
    totalPodcastNotWithVideo: 0,
    totalPodcastExplanation: 0
  };

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.updateAllData();
  }

  public updateAllData(): void {
    this.display.isLoading = true;
    this.mainService.GetData().subscribe(res => {
      this.podcastList = res["list"];

      this.display.totalPodcast = this.podcastList.length;

      this.display.totalContent = this.podcastList.map(x => x.content.length).reduce((a, b) => { return a + b });
      this.display.totalContentLink = this.podcastList.map(x => x.content.map(x => x.contentLink.length).reduce((a, b) => { return a + b })).reduce((a, b) => { return a + b });
      this.display.totalPodcastWithVideo = this.podcastList.filter(x => x.videoLink != "#").length;
      this.display.totalPodcastNotWithVideo = this.podcastList.filter(x => x.videoLink == "#").length;
      this.display.totalPodcastExplanation = this.podcastList.filter(x => x.explanationPodcast.length > 0).length;


      this.podcastList.forEach(element => {
        if (this.chartYearPodcast.label.filter(x => x == element.year).length < 1) {
          this.chartYearPodcast.label.push(element.year);
          this.chartYearPodcast.dataset[0].data.push(this.podcastList.filter(x => x.year == element.year).length);
        }
      });

      this.podcastList.forEach(element => {
        if (this.chartYearContent.label.filter(x => x == element.year).length < 1) {
          this.chartYearContent.label.push(element.year);
          this.chartYearContent.dataset[0].data.push(this.podcastList.filter(x => x.year == element.year).map(x => x.content.length).reduce((a, b) => { return a + b }));
        }
      });

      this.podcastList.forEach(element => {
        if (this.chartYearLink.label.filter(x => x == element.year).length < 1) {
          this.chartYearLink.label.push(element.year);
          this.chartYearLink.dataset[0].data.push(this.podcastList.filter(x => x.year == element.year).map(x => x.content.map(x => x.contentLink.length).reduce((a, b) => { return a + b })).reduce((a, b) => { return a + b }));
        }
      });

      this.podcastList.forEach(element => {
        if (this.chartYearVideo.label.filter(x => x == element.year).length < 1) {
          this.chartYearVideo.label.push(element.year);
          this.chartYearVideo.dataset[0].data.push(this.podcastList.filter(x => x.year == element.year && x.videoLink != "#").length);
        }
      });

      this.podcastList.forEach(element => {
        if (this.chartYearExplanation.label.filter(x => x == element.year).length < 1) {
          this.chartYearExplanation.label.push(element.year);
          this.chartYearExplanation.dataset[0].data.push(this.podcastList.filter(x => x.year == element.year && x.explanationPodcast.length > 0).length);
        }
      });


      this.display.isLoading = false;
    });
  }

}