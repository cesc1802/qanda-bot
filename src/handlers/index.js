import { handleAnnouncements } from "./handleAnnouncement.js"
import { handleDailyAssignment } from "./handleDailyAssignment.js"
import { handleDiscussion } from "./handleDiscussion.js"

export async function registerHandlers(bot) {
    await handleAnnouncements(bot)
    // handleDailyAssignment(bot)
    // handleDiscussion(bot)
}