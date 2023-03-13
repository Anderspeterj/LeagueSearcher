// use https (http secure).
// http (non-secure) will make the app complain about mixed content when running the app from Azure
Vue.createApp({
    data() {
      return {
        summoner: null,
        summonerName: "",
        matchIds: [],
        match: null,
        participantId: null
      };
    },
    methods: {
      async getSummoner() {
        const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.summonerName}?api_key=RGAPI-542ed6c8-f902-4a7e-9f12-43e41d5e9ab4`;
        try {
          const response = await axios.get(url);
          this.summoner = response.data;
          await this.getMatchIds();
        } catch (ex) {
          alert(ex.message);
        }
      },
      async getMatchIds() {
        const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.summoner.puuid}/ids?start=0&count=20&api_key=RGAPI-542ed6c8-f902-4a7e-9f12-43e41d5e9ab4`;
        try {
          const response = await axios.get(url);
          this.matchIds = response.data;
        } catch (ex) {
          alert(ex.message);
        }
      },
      async getMatch(matchId) {
        const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=RGAPI-542ed6c8-f902-4a7e-9f12-43e41d5e9ab4`;
        try {
          const response = await axios.get(url);
          this.match = response.data;
          this.participantId = this.getParticipantId();
        } catch (ex) {
          alert(ex.message);
        }
      },
      getParticipantId() {
        return this.match.info.participants.find(
          (p) => p.puuid === this.summoner.puuid
        ).participantId;
      },
    },
  }).mount("#app");
