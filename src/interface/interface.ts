export interface Param {
  id_ev: number,
  priority: number,
  duration: number,
  is_live: boolean,
  dt_ev: string,
  icon_ht: string,
  icon_at: string,
  link_lp: string,
  link_site: string,
  kf: Koeff[];
}

export interface Koeff {
  1: number,
  X: number,
  2: number,
}

export interface Event {
  id_ev: number,
  priority: number,
  duration: number,
  icon_ht: string,
  icon_at: string,
  start_show: string,
  end_show: string,
  link_lp: string,
  link_site: string,
}
