import fetch from "node-fetch";
import { CAT_API_BASE_URL } from "../../config/constants";
import { cache } from "../../config/databases";

export default class CatService {
  private breeds = "breeds";
  private images = "images/search";
  private limit = 10;
  // if repo include repo here
  constructor() {}

  async addBreedToCache() {
    const response = await fetch(`${CAT_API_BASE_URL}${this.breeds}`);
    const result = await response.json();

    cache.set(
      "breed",
      result.map((el: any) => ({ id: el.id, name: el.name, count: 0 }))
    );
  }

  async getMostSearched() {
    const mostSearched: any[] = cache.get("breed");

    if (!mostSearched) {
      return new Error("No most searched");
    }

    return mostSearched
      .sort((a, b) => {
        if (a.count > b.count) {
          return -1;
        } else if (a.count === b.count) {
          return 0;
        }
        return 1;
      })
      .slice(0, 10);
  }

  async getBreed(breed: string) {
    const response = await fetch(`${CAT_API_BASE_URL}${this.breeds}/${breed}`);
    const result = await response.json();
    let mostSearched: any[] = cache.get("breed");

    if (!mostSearched) {
      await this.addBreedToCache();
      mostSearched = cache.get("breed");
    }

    cache.set(
      "breed",
      mostSearched.map(el => {
        if (el.id === breed) {
          el.count++;
        }
        return el;
      })
    );

    return result;
  }

  async get4Breeds() {
    const response = await fetch(CAT_API_BASE_URL + this.breeds + "?limit=4");
    const result = await response.json();

    return result;
  }

  async getAllBreeds(page: number) {
    const url = `${CAT_API_BASE_URL}${this.breeds}?limit=${this.limit}&page=${page}&api_key=${process.env.CAT_API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  }

  async getAllImages(breed: string, page: number) {
    const url = `${CAT_API_BASE_URL}${this.images}?limit=${this.limit}&page=${page}&breed_ids=${breed}&api_key=${process.env.CAT_API_KEY}`;
    const response = await fetch(url);
    const result = await response.json();
    const urls = result.reduce((acc: string[], el: any) => {
      acc.push(el.url);
      return acc;
    }, []);

    return urls;
  }

  async getSearchBreeds(word: string) {
    let result: any[] = cache.get("breed");
    if (!result) {
      await this.addBreedToCache();
    }
    result = cache.get("breed");

    return result.filter(el => {
      if (el.name.toLowerCase().startsWith(word)) {
        return true;
      }
      return false;
    });
  }
}
