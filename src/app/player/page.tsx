import { Match } from '../../components/Match/index';
import { GetServerSideProps } from "next";

interface SessionPlaytime {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface Team {
  has_won: boolean;
  rounds_won: number;
  rounds_lost: number;
  roster: null; // You might want to replace this with the actual type for roster
}

interface FriendlyFire {
  incoming: number;
  outgoing: number;
}

interface Behavior {
  afk_rounds: number;
  friendly_fire: FriendlyFire;
  rounds_in_spawn: number;
}

interface Os {
  name: string;
  version: string;
}

interface Platform {
  type: string;
  os: Os;
}

interface AbilityCasts {
  c_cast: number;
  q_cast: number;
  e_cast: number;
  x_cast: number;
}

interface Card {
  small: string;
  large: string;
  wide: string;
}

interface Agent {
  small: string;
  bust: string;
  full: string;
  killfeed: string;
}

interface Assets {
  card: Card;
  agent: Agent;
}

interface Stats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  bodyshots: number;
  headshots: number;
  legshots: number;
}

interface Spent {
  overall: number;
  average: number;
}

interface LoadoutValue {
  overall: number;
  average: number;
}

interface Economy {
  spent: Spent;
  loadout_value: LoadoutValue;
}

interface PlayerData {
  puuid: string;
  name: string;
  tag: string;
  team: string;
  level: number;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  player_card: string;
  player_title: string;
  party_id: string;
  session_playtime: SessionPlaytime;
  behavior: Behavior;
  platform: Platform;
  ability_casts: AbilityCasts;
  assets: Assets;
  stats: Stats;
  economy: Economy;
  damage_made: number;
  damage_received: number;
}

export type Info = {
  coaches: [],
  kills: [],
  metadata: {
    cluster: string,
    game_length: number,
    game_start: number,
    game_start_patched: string,
    game_version: string,
    map: string,
    matchid: string,
    mode: string,
    mode_id: string,
    platform: string,
    premier_info: {tournament_id: null, matchup_id: null}
    queue: string,
    region: string,
    rounds_played: number,
    season_id: string,
  }
  observers: [],
  players: {
    all_players: PlayerData[], 
    red: PlayerData[], 
    blue: PlayerData[]
  }
  rounds: []
  teams: {
    red: Team, 
    blue: Team
  }
}

type Res = {
  status: number,
  data: Info[],
}

const fetchData = (
  name: string,
  tag: string,
): Promise<Res>  => 
  fetch(`https://api.henrikdev.xyz/valorant/v3/matches/eu/${name}/${tag}`, {
    cache: 'no-cache', // size too large to cache
  }).then(
    response => response.json()
  )

export default async function Player ({ searchParams }: {
  searchParams: {
    id: string,
    name: string,
    tag: string,
  };
}) {
  const { name, tag, id } = searchParams;
  const data = await fetchData(name, tag);
  return (
    <div>
      {data && data.data.map((match, index) => <div key={index}><Match userId={id} match={match}/></div>)}
    </div>
  )
}