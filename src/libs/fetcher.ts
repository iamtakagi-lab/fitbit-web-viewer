import Fitbit from "./fitbit"
import Credential from "./credential"
import { Activity } from "../types"

const fetch = (credential: Credential, fitbit: Fitbit) => {
    const activity: Activity = {
        heartrate: "0 bpm",
        miles: "0 mi",
        calories: "0 kcal",
        floors: "0 階",
        sleep: "0分"
    }

    return new Promise<Activity>((resolve) => {
        Promise.all([
            fitbit.getLastHeartRate(credential).then((value) => { activity.heartrate = `${value} bpm` }),
            fitbit.getTotalMiles(credential).then((value) => {  activity.miles = `${value} mi` }),
            fitbit.getCaloriesBurned(credential).then((value) => { activity.calories = `${value} kcal` }),
            fitbit.getTotalFloors(credential).then((value) => { activity.floors = `${value} 階`; }),
            fitbit.getSleepTime(credential).then((value) => { activity.sleep = value })
        ]).then(() => {
            resolve(activity)
        })
    })
}

export default fetch