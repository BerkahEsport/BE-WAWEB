const axios = require('axios');
var hoyolab = {
    act_id: {
        genshin: "e202102251931481",
        hsr: "e202303301540311"
    },
    url: {
        genshin: {
            daily: "https://sg-hk4e-api.hoyolab.com/event/sol/"
        },
        hsr: {
            daily: "https://sg-public-api.hoyolab.com/event/luna/os/"
        }
    }
}
module.exports = {
    async getListClaimedRewards(game, cookie) {
        const { data: result } = await axios(hoyolab.url[game].daily + "award", {
            method: "GET",
            headers: {
                'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                'cookie': cookie
            },
            params: {
                act_id: hoyolab.act_id[game]
            }
        })
        return result;
    },
    async claimDailyCheckIn(game, cookie) {
        const { data: result } = await axios(hoyolab.url[game].daily + "sign", {
            method: "POST",
            headers: {
                'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                'referer': "https://act.hoyolab.com/",
                'cookie': cookie
            },
            params: {
                act_id: hoyolab.act_id[game],
                lang: "id-id"
            }
        })
        return result;
    }
}