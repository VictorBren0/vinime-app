import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC, search: $search) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          extraLarge
        }
        bannerImage
        description
        averageScore
        genres
      }
    }
  }
`;

export const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
      }
      bannerImage
      description
      episodes
      duration
      genres
      averageScore
      status
      startDate {
        year
        month
        day
      }
    }
  }
`;
