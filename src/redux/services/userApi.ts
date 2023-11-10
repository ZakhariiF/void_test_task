import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type User = {
   PlayerCardID: string,
  TitleID: string,
  IsBanned: boolean,
  IsAnonymized: boolean,
  puuid: string,
  gameName: string,
  tagLine: string,
  leaderboardRank: number,
  rankedRating: number,
  numberOfWins: number,
  competitiveTier: number
};

type Response = {
  players: User[],
}

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.henrikdev.xyz/valorant/v2/leaderboard/eu",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<Response, null>({
      query: () => "",
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
