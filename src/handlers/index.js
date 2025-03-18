import { handleAnnouncements } from "./handleAnnouncement.js"
import { handleDailyAssignment } from "./handleDailyAssignment.js"
import { handleDiscussion } from "./handleDiscussion.js"

export function registerHandlers(bot) {
    handleAnnouncements(bot)
    handleDailyAssignment(bot)
    handleDiscussion(bot)
}