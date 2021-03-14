import React from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import {champions} from "./champion.js"

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            key: "",
            username: "",
            data: [
                ["1", "2", "3"],
                ["1", "2", "3"],
            ],
            headers: ["one", "two", "three"],
            display: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleAPIChange = this.handleAPIChange.bind(this);
        this.generateDate = this.generateDate.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handleAPIChange(event) {
        this.setState({key: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var u = this.state.username;
        var k = this.state.key;
        //RGAPI-c74b5029-72bd-4d56-9d1d-7e1f112fd43d
        axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${u}?api_key=${k}`)
        .then(res => {

            var accId = res.data.accountId;
            axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}?api_key=${k}`)
            .then(res => {
                var games = res.data.matches

                var headers = [
                    "team_one_win", 
                    "duration", 
                    "type", 
                    "team_one_barons", 
                    "team_two_barons",
                    "team_one_dragons",
                    "team_two_dragons",
                    "team_one_rift_heralds",
                    "team_two_rift_heralds",

                    "team_one_first_baron",
                    "team_one_first_blood",
                    "team_one_first_dragon",
                    "team_one_first_inhibitor",
                    "team_one_first_rift_herald",
                    "team_one_first_tower",

                    "team_one_assists",
                    "team_two_assists",
                    "team_one_level",
                    "team_two_level",
                    "team_one_kills",
                    "team_two_kills",
                    "team_one_obj_damage",
                    "team_two_obj_damage",
                    "team_one_deaths",
                    "team_two_deaths",

                    "team_one_gold",
                    "team_two_gold",
                    "team_one_double_kills",
                    "team_two_double_kills",
                    "team_one_damage",
                    "team_two_damage",
                    "team_one_enemy_monsters_killed",
                    "team_two_enemy_monsters_killed",
                    "team_one_cc_time",
                    "team_two_cc_time",

                    "team_one_healing",
                    "team_two_healing",
                    "team_one_champ_damage",
                    "team_two_champ_damage",
                    "team_one_cs",
                    "team_two_cs",
                    "team_one_vision_score",
                    "team_two_vision_score",

                    "team_one_top_avg_cs_diff",
                    "team_one_jungle_avg_cs_diff",
                    "team_one_mid_avg_cs_diff",
                    "team_one_bot_avg_cs_diff",
                    "team_one_top_avg_dmg_taken_diff",
                    "team_one_jungle_avg_dmg_taken_diff",
                    "team_one_mid_avg_dmg_taken_diff",
                    "team_one_bot_avg_dmg_taken_diff",
                    "team_one_top_avg_xp_diff",
                    "team_one_jungle_avg_xp_diff",
                    "team_one_mid_avg_xp_diff",
                    "team_one_bot_avg_xp_diff",

                    "team_one_top_champ",
                    "team_one_jungle_champ",
                    "team_one_mid_champ",
                    "team_one_bot_champ",
                    "team_one_top_champ_diff",
                    "team_one_jungle_champ_diff",
                    "team_one_mid_champ_diff",
                    "team_one_bot_champ_diff",
                    "team_one_top_champ_type",
                    "team_one_jungle_champ_type",
                    "team_one_mid_champ_type",
                    "team_one_bot_champ_type",

                    "team_two_top_champ",
                    "team_two_jungle_champ",
                    "team_two_mid_champ",
                    "team_two_bot_champ",
                    "team_two_top_champ_diff",
                    "team_two_jungle_champ_diff",
                    "team_two_mid_champ_diff",
                    "team_two_bot_champ_diff",
                    "team_two_top_champ_type",
                    "team_two_jungle_champ_type",
                    "team_two_mid_champ_type",
                    "team_two_bot_champ_type",
                ];
                var data = [];

                var i = 0;
                
                var loop = () => {
                    setTimeout(() => {
                        var matchId = games[i].gameId;
                        axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${k}`)
                        .then(res => {
                            console.log(res);

                            if (res.data.gameMode == "CLASSIC") {
                                var teamOneAssists = 0;
                                var teamTwoAssists = 0;
                                var teamOneLevel = 0;
                                var teamTwoLevel = 0;
                                var teamOneKills = 0;
                                var teamTwoKills = 0;
                                var teamOneObjDamage = 0;
                                var teamTwoObjDamage = 0;
                                var teamOneDeaths = 0;
                                var teamTwoDeaths = 0;

                                var teamOneGold = 0;
                                var teamTwoGold = 0;
                                var teamOneDoubleKills = 0;
                                var teamTwoDoubleKills = 0;
                                var teamOneDamage = 0;
                                var teamTwoDamage = 0;
                                var teamOneEnemyMonstersKilled = 0;
                                var teamTwoEnemyMonstersKilled = 0;
                                var teamOneCcTime = 0;
                                var teamTwoCcTime = 0;

                                var teamOneHealing = 0;
                                var teamTwoHealing = 0;
                                var teamOneChampDmg = 0;
                                var teamTwoChampDmg = 0;
                                var teamOneCs = 0;
                                var teamTwoCs = 0;
                                var teamOneVisionScore = 0;
                                var teamTwoVisionScore = 0;

                                var teamOneTopAvgCsDiff = 0;
                                var teamOneJungleAvgCsDiff = 0;
                                var teamOneMidAvgCsDiff = 0;
                                var teamOneBotAvgCsDiff = 0;
                                var teamOneTopAvgDmgTakenDiff = 0;
                                var teamOneJungleAvgDmgTakenDiff = 0;
                                var teamOneMidAvgDmgTakenDiff = 0;
                                var teamOneBotAvgDmgTakenDiff = 0;
                                var teamOneTopAvgXpDiff = 0;
                                var teamOneJungleAvgXpDiff = 0;
                                var teamOneMidAvgXpDiff = 0;
                                var teamOneBotAvgXpDiff = 0;

                                var teamOneTopChamp = "";
                                var teamOneJungleChamp = "";
                                var teamOneMidChamp = "";
                                var teamOneBotChamp = "";
                                var teamOneTopChampDiff = 0;
                                var teamOneJungleChampDiff = 0;
                                var teamOneMidChampDiff = 0;
                                var teamOneBotChampDiff = 0;
                                var teamOneTopChampType = "";
                                var teamOneJungleChampType = "";
                                var teamOneMidChampType = "";
                                var teamOneBotChampType = "";

                                var teamTwoTopChamp = "";
                                var teamTwoJungleChamp = "";
                                var teamTwoMidChamp = "";
                                var teamTwoBotChamp = "";
                                var teamTwoTopChampDiff = 0;
                                var teamTwoJungleChampDiff = 0;
                                var teamTwoMidChampDiff = 0;
                                var teamTwoBotChampDiff = 0;
                                var teamTwoTopChampType = "";
                                var teamTwoJungleChampType = "";
                                var teamTwoMidChampType = "";
                                var teamTwoBotChampType = "";
                                
                                for (var j = 0; j < res.data.participants.length; j++) {
                                    var player = res.data.participants[j];

                                    var avgCsDiff = 0;
                                    var avgDmgDiff = 0;
                                    var avgXpDiff = 0;
                                    var champ = null;

                                    champ = this.getChampionById(player.championId);

                                    if (j <= 4) {
                                        // team 1
                                        teamOneAssists += player.stats.assists;
                                        teamOneLevel += player.stats.champLevel;
                                        teamOneKills += player.stats.kills;
                                        teamOneObjDamage += player.stats.damageDealtToObjectives;
                                        teamOneDeaths += player.stats.deaths;

                                        teamOneGold += player.stats.goldEarned;
                                        teamOneDoubleKills += player.stats.doubleKills;
                                        teamOneDamage += player.stats.totalDamageDealt;
                                        teamOneEnemyMonstersKilled += player.stats.neutralMinionsKilledEnemyJungle;
                                        teamOneCcTime += player.stats.timeCCingOthers;

                                        teamOneHealing += player.stats.totalHeal;
                                        teamOneChampDmg += player.stats.totalDamageDealtToChampions;
                                        teamOneCs += player.stats.totalMinionsKilled;
                                        teamOneVisionScore += player.stats.visionScore;

                                        for (let times in player.timeline.csDiffPerMinDeltas) {
                                            if (player.timeline.csDiffPerMinDeltas.hasOwnProperty(times)) {
                                                avgCsDiff += player.timeline.csDiffPerMinDeltas[times];
                                            }
                                            
                                            if (player.timeline.damageTakenDiffPerMinDeltas.hasOwnProperty(times)) {
                                                avgDmgDiff += player.timeline.damageTakenDiffPerMinDeltas[times];
                                            }

                                            if (player.timeline.xpDiffPerMinDeltas.hasOwnProperty(times)) {
                                                avgXpDiff += player.timeline.xpDiffPerMinDeltas[times];
                                            }

                                        }
                                        avgCsDiff /= Object.keys(player.timeline.csDiffPerMinDeltas).length;
                                        avgDmgDiff /= Object.keys(player.timeline.damageTakenDiffPerMinDeltas).length;
                                        avgXpDiff /= Object.keys(player.timeline.xpDiffPerMinDeltas).length;

                                        

                                        switch (player.timeline.lane) {
                                            case "TOP":
                                                teamOneTopAvgCsDiff = avgCsDiff;
                                                teamOneTopAvgDmgTakenDiff = avgDmgDiff;
                                                teamOneTopAvgXpDiff = avgXpDiff;
                                                teamOneTopChamp = champ.name;
                                                teamOneTopChampDiff = champ.difficulty;
                                                teamOneTopChampType = champ.type;
                                                break;
                                            case "JUNGLE":
                                                teamOneJungleAvgCsDiff = avgCsDiff;
                                                teamOneJungleAvgDmgTakenDiff = avgDmgDiff;
                                                teamOneJungleAvgXpDiff = avgXpDiff;
                                                teamOneJungleChamp = champ.name;
                                                teamOneJungleChampDiff = champ.difficulty;
                                                teamOneJungleChampType = champ.type;
                                                break;
                                            case "MIDDLE":
                                                teamOneMidAvgCsDiff = avgCsDiff
                                                teamOneMidAvgDmgTakenDiff = avgDmgDiff;
                                                teamOneMidAvgXpDiff = avgXpDiff;
                                                teamOneMidChamp = champ.name;
                                                teamOneMidChampDiff = champ.difficulty;
                                                teamOneMidChampType = champ.type;
                                                break;
                                            case "BOTTOM":
                                                // Stats for bot are aggreagted, use +=
                                                // Just summing up the averages
                                                teamOneBotAvgCsDiff += avgCsDiff;
                                                teamOneBotAvgDmgTakenDiff += avgDmgDiff;
                                                teamOneBotAvgXpDiff += avgXpDiff;
                                                // Just takes a random bot champ
                                                teamOneBotChamp = champ.name;
                                                teamOneBotChampDiff = champ.difficulty;
                                                teamOneBotChampType = champ.type;
                                                break;
                                            default:
                                                console.log("PLAYER LANES NULL - VALUES SET TO ZERO");
                                        }
                                    } else {
                                        // team 2
                                        teamTwoAssists += player.stats.assists;
                                        teamTwoLevel += player.stats.champLevel;
                                        teamTwoKills += player.stats.kills;
                                        teamTwoObjDamage += player.stats.damageDealtToObjectives;
                                        teamTwoDeaths += player.stats.deaths;

                                        teamTwoGold += player.stats.goldEarned;
                                        teamTwoDoubleKills += player.stats.doubleKills;
                                        teamTwoDamage += player.stats.totalDamageDealt;
                                        teamTwoEnemyMonstersKilled += player.stats.neutralMinionsKilledEnemyJungle;
                                        teamTwoCcTime += player.stats.timeCCingOthers;

                                        teamTwoHealing += player.stats.totalHeal;
                                        teamTwoChampDmg += player.stats.totalDamageDealtToChampions;
                                        teamTwoCs += player.stats.totalMinionsKilled;
                                        teamTwoVisionScore += player.stats.visionScore;

                                        switch (player.timeline.lane) {
                                            case "TOP":;
                                                teamTwoTopChamp = champ.name;
                                                teamTwoTopChampDiff = champ.difficulty;
                                                teamTwoTopChampType = champ.type;
                                                break;
                                            case "JUNGLE":
                                                teamTwoJungleChamp = champ.name;
                                                teamTwoJungleChampDiff = champ.difficulty;
                                                teamTwoJungleChampType = champ.type;
                                                break;
                                            case "MIDDLE":
                                                teamTwoMidChamp = champ.name;
                                                teamTwoMidChampDiff = champ.difficulty;
                                                teamTwoMidChampType = champ.type;
                                                break;
                                            case "BOTTOM":
                                                teamTwoBotChamp = champ.name;
                                                teamTwoBotChampDiff = champ.difficulty;
                                                teamTwoBotChampType = champ.type;
                                                break;
                                            default:
                                                console.log("PLAYER LANES NULL - VALUES SET TO ZERO");
                                        }
                                    }
                                }

                                data.push([
                                    (res.data.teams[0].win == "Win") ? 1 : 0,
                                    res.data.gameDuration,
                                    res.data.gameMode,
                                    res.data.teams[0].baronKills,
                                    res.data.teams[1].baronKills,
                                    res.data.teams[0].dragonKills,
                                    res.data.teams[1].dragonKills,
                                    res.data.teams[0].riftHeraldKills,
                                    res.data.teams[1].riftHeraldKills,
    
                                    (res.data.teams[0].firstBaron) ? 1 : 0,
                                    (res.data.teams[0].firstBlood) ? 1 : 0,
                                    (res.data.teams[0].firstDragon) ? 1 : 0,
                                    (res.data.teams[0].firstInhibitor) ? 1 : 0,
                                    (res.data.teams[0].firstRiftHerald) ? 1 : 0,
                                    (res.data.teams[0].firstTower) ? 1 : 0,

                                    teamOneAssists,
                                    teamTwoAssists,
                                    teamOneLevel,
                                    teamTwoLevel,
                                    teamOneKills,
                                    teamTwoKills,
                                    teamOneObjDamage,
                                    teamTwoObjDamage,
                                    teamOneDeaths,
                                    teamTwoDeaths,

                                    teamOneGold,
                                    teamTwoGold,
                                    teamOneDoubleKills,
                                    teamTwoDoubleKills,
                                    teamOneDamage,
                                    teamTwoDamage,
                                    teamOneEnemyMonstersKilled,
                                    teamTwoEnemyMonstersKilled,
                                    teamOneCcTime,
                                    teamTwoCcTime,

                                    teamOneHealing,
                                    teamTwoHealing,
                                    teamOneChampDmg,
                                    teamTwoChampDmg,
                                    teamOneCs,
                                    teamTwoCs,
                                    teamOneVisionScore,
                                    teamTwoVisionScore,

                                    teamOneTopAvgCsDiff,
                                    teamOneJungleAvgCsDiff,
                                    teamOneMidAvgCsDiff,
                                    teamOneBotAvgCsDiff,
                                    teamOneTopAvgDmgTakenDiff,
                                    teamOneJungleAvgDmgTakenDiff,
                                    teamOneMidAvgDmgTakenDiff,
                                    teamOneBotAvgDmgTakenDiff,
                                    teamOneTopAvgXpDiff,
                                    teamOneJungleAvgXpDiff,
                                    teamOneMidAvgXpDiff,
                                    teamOneBotAvgXpDiff,

                                    teamOneTopChamp,
                                    teamOneJungleChamp,
                                    teamOneMidChamp,
                                    teamOneBotChamp,
                                    teamOneTopChampDiff,
                                    teamOneJungleChampDiff,
                                    teamOneMidChampDiff,
                                    teamOneBotChampDiff,
                                    teamOneTopChampType,
                                    teamOneJungleChampType,
                                    teamOneMidChampType,
                                    teamOneBotChampType,

                                    teamTwoTopChamp,
                                    teamTwoJungleChamp,
                                    teamTwoMidChamp,
                                    teamTwoBotChamp,
                                    teamTwoTopChampDiff,
                                    teamTwoJungleChampDiff,
                                    teamTwoMidChampDiff,
                                    teamTwoBotChampDiff,
                                    teamTwoTopChampType,
                                    teamTwoJungleChampType,
                                    teamTwoMidChampType,
                                    teamTwoBotChampType,
                                ])
                            }
                        })

                        i++;
                        this.setState({data: data, headers: headers}, () => {
                            this.setState({display: <CSVLink key={this.generateDate()} data={this.state.data} headers={this.state.headers}>Download me</CSVLink>})
                        });

                        if (i < games.length ) { loop(); }
                    }, 3000)
                }
                loop();
                console.log(this.state);
            })
        })
    }

    generateDate() {
        var date = Date.now();
        return date;
    }

    componentDidMount() {
        var testChamp = this.getChampionById(63);
        console.log(testChamp);
    }

    getChampionById(id) {
        // for in doesn't work for some reason.
        for (let [key, value] of Object.entries(champions.data)) {
            if (parseInt(value.key) == id) {
                return({
                    name: value.id,
                    difficulty: value.info.difficulty,
                    type: value.tags[0],
                })
            }
        }
    }
    
    render() {
        return(
            <div>
                First is username, second is api key
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleUsernameChange}></input>
                    <input type="text" onChange={this.handleAPIChange}></input>
                    <input type="submit"></input>
                </form>
                {this.state.display}
            </div>
        )
    }
}