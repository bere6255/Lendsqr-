import Bans from "../../models/Bans";
import User from "../../models/User";
const logPrefix ="[BAN:USER:UTILS]";
type ban ={
    userID: string;
    banBy: string;
    comment: string;
}

export default async ({ userID, banBy, comment }: ban) => {
    try {
        console.log(`${logPrefix} ban user_id ${userID}  ===> ban for exceeding login attempts`);
        await User.query()
            .patch({ banned_at: new Date() })
            .where("id", "=", userID);
        await Bans.query().insert({
            user_id: userID,
            ban_by: banBy,
            comment,
            created_at: new Date,
            updated_at: new Date
        });
        return true;
    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return false;
    }
 
    
}