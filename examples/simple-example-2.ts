import { faast } from "../src/faast";
import * as m from "./functions";
import { sleep } from "../src/shared";

async function main() {
    const cloudFunc = await faast("aws", m, "./module", {
        mode: "https"
    });

    const promises = [];
    for (let i = 0; i < 5; i++) {
        promises.push(cloudFunc.functions.hello("world"));
    }

    await Promise.all(promises);
    console.log(`Cost estimate:`);
    console.log(`${await cloudFunc.costEstimate()}`);

    await cloudFunc.cleanup();
}

main();
