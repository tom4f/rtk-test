export default class ApiService {
  private apiUrl: string;
  constructor() {
    this.apiUrl = "/api";
  }
  async getPlaylist(playlistId: string) {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: playlistId }),
    };
    const response = await fetch(`${this.apiUrl}/playlist`, request);
    return response;
  }
  async getSlug(id: string) {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };
    const response = await fetch(`${this.apiUrl}/slug`, request);
    return response;
  }
}
