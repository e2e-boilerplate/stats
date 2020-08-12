import {writeFileSync} from "fs";
import {logger} from "../src/constants";

function getSample() {
    try {
        const redacted = require(`../data/redacted/redacted.json`);
        const countData = {};
        const uniqueData = {}

        redacted.forEach((r) => {
            const {referrers} = r;
            referrers.forEach(item => {
                const flag = false;
                const { referrer, count, uniques } = item;

                if (countData.hasOwnProperty(referrer)) {
                    countData[referrer] = countData[referrer] + count;
                    uniqueData[referrer] = uniqueData[referrer] + uniques;
                } else {
                    countData[referrer] = count;
                    uniqueData[referrer] = uniques;
                }

            })
        });

        const contentCount = JSON.stringify(countData);
        const contentUnique = JSON.stringify(uniqueData);

        writeFileSync("data/chart/referrer/count.json", contentCount, "utf8");
        writeFileSync("data/chart/referrer/unique.json", contentUnique, "utf8");
    } catch (error) {
        logger.error(error.message);
    }
}

getSample();
