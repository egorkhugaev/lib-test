export class MyLibrary {
  nowDate = new Date();
  liveEvent = <any>[];
  lineEvent = <any>[];
  sportId = '1';
  lineReq = '';
  liveReq = '';

  getInfoBanners(idSport: string) {
    return this.getInfo(idSport);
  }

  getInfo(id: string) {
    this.sportId = id;
    return this.getConfig(id).then((config) => {
      this.getEvents(config)
      if (this.lineReq) {
        this.getLineEventInfo(this.lineReq).then((data) => {
          this.getKoeffInfo(data);
        })
      }
      if (this.liveReq) {
        this.getLiveEventInfo(this.liveReq).then((data) => {
          this.getKoeffInfo(data);
        })
      }

    })

  }

  getLineEventInfo(idEvent: string) {
    return fetch(
      `https://ad.betcity.ru/d/off/events/ext?ev_ids=${idEvent}&test=1&kf_ids=69`,
      {
        method: 'GET',
      }
    )
      .then(data => {
        return data.json();
      })
      .then(data => {
        return data.reply;
      });
  }

  getLiveEventInfo(idEvent: string) {
    return fetch(
      `https://ad.betcity.ru/on_air/bets/ext?ev_ids=${idEvent}&test=1&kf_ids=69`,
      {
        method: 'GET',
      }
    )
      .then(data => {
        return data.json();
      })
      .then(data => {
        return data
      });
  }

  getConfig(idSport: string) {
      return fetch(
        `assets/sp${idSport}.json`,
      )
        .then((data) => {
          return data.json();
        })
        .then((config) => {
          return config;
      });
  }

  getEvents(data: any): any[] {
    let events = <any>[];
    data.events.forEach((event: any) => {
      const dateEndShow = new Date(event.end_show);
      const dateStartShow = new Date(event.start_show);
      if (this.nowDate < dateEndShow) {
        if (event.is_live) {
          this.liveReq = this.liveReq ? this.liveReq + `,${event.id_ev.toString()}` : event.id_ev.toString();
          this.liveEvent.push(event);
          return
        }
        this.lineReq = this.lineReq ? this.lineReq + `,${event.id_ev.toString()}` : event.id_ev.toString();
        this.lineEvent.push(event);
        return;
      }
      let date = new Date(event.start_show);
    })
    return events;
  }

  getKoeffInfo(data: any): void {
    console.log('daaTA', data)
    if (!data.sports[this.sportId]) {
      return null
    }
    const champIds = Object.keys(data.sports[this.sportId].chmps);

    if (!champIds) { return null; }
    champIds.forEach((champId) => {
      const eventIds = Object.keys(data.sports[this.sportId].chmps[champId].evts);
      if (!eventIds) { return }
      eventIds.forEach((eventId) => {
        this.setKoeff(data.sports[this.sportId].chmps[champId].evts[eventId].main, eventId);
      })
    })
  }

  setKoeff(koeffData: any, idEvent: string) {
    console.log(koeffData, idEvent)
    let koeff = {};

  }
}
