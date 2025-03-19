import {config} from "../config/config.js";
import { message } from "telegraf/filters";

const motivationalPhrases = [
  { english: "Great job!", vietnamese: "Làm tốt lắm!" },
  { english: "Well done!", vietnamese: "Làm tốt lắm!" },
  { english: "Excellent work!", vietnamese: "Bài làm xuất sắc!" },
  { english: "Your punctuality shows commitment!", vietnamese: "Sự đúng hẹn của em thể hiện sự cam kết!" },
  { english: "Perfect timing!", vietnamese: "Thời gian nộp bài hoàn hảo!" },
  { english: "I appreciate your timeliness!", vietnamese: "Thầy/Cô đánh giá cao sự đúng giờ của em!" },
  { english: "Impressive responsibility!", vietnamese: "Trách nhiệm thật ấn tượng!" },
  { english: "Keep up the good work!", vietnamese: "Hãy tiếp tục phát huy!" },
  { english: "You're setting a great example!", vietnamese: "Em đang tạo một tấm gương tốt!" },
  { english: "Your dedication shows!", vietnamese: "Sự tận tâm của em thể hiện rõ ràng!" },
  { english: "Outstanding time management!", vietnamese: "Quản lý thời gian xuất sắc!" },
  { english: "You're on the right track!", vietnamese: "Em đang đi đúng hướng!" },
  { english: "Brilliant work ethic!", vietnamese: "Đạo đức làm việc tuyệt vời!" },
  { english: "You're a role model!", vietnamese: "Em là tấm gương cho mọi người!" },
  { english: "Consistency is your strength!", vietnamese: "Sự nhất quán là điểm mạnh của em!" },
  { english: "I'm proud of your effort!", vietnamese: "Thầy/Cô tự hào về nỗ lực của em!" },
  { english: "Fantastic job meeting the deadline!", vietnamese: "Hoàn thành xuất sắc đúng hạn!" },
  { english: "Your reliability is commendable!", vietnamese: "Sự đáng tin cậy của em đáng khen ngợi!" },
  { english: "You're showing great progress!", vietnamese: "Em đang thể hiện sự tiến bộ tuyệt vời!" },
  { english: "Excellent prioritizing skills!", vietnamese: "Kỹ năng sắp xếp ưu tiên xuất sắc!" },
  { english: "You're becoming a star student!", vietnamese: "Em đang trở thành học sinh xuất sắc!" },
  { english: "Your punctuality is impressive!", vietnamese: "Sự đúng giờ của em thật ấn tượng!" },
  { english: "Success follows discipline!", vietnamese: "Thành công đến từ kỷ luật!" },
  { english: "You're developing great habits!", vietnamese: "Em đang phát triển thói quen tốt!" },
  { english: "I value your consistency!", vietnamese: "Thầy/Cô đánh giá cao sự nhất quán của em!" },
  { english: "Promptness pays off!", vietnamese: "Sự nhanh chóng mang lại lợi ích!" },
  { english: "You're exceeding expectations!", vietnamese: "Em đang vượt xa mong đợi!" },
  { english: "Your responsibility stands out!", vietnamese: "Trách nhiệm của em thật nổi bật!" },
  { english: "Brilliant time awareness!", vietnamese: "Nhận thức về thời gian tuyệt vời!" },
  { english: "You're mastering organization!", vietnamese: "Em đang làm chủ kỹ năng tổ chức!" },
  { english: "I'm impressed by your diligence!", vietnamese: "Thầy/Cô ấn tượng với sự chăm chỉ của em!" },
  { english: "You're showing great maturity!", vietnamese: "Em đang thể hiện sự trưởng thành tuyệt vời!" },
  { english: "Your commitment is clear!", vietnamese: "Cam kết của em thật rõ ràng!" },
  { english: "Timely work reflects respect!", vietnamese: "Công việc đúng hạn thể hiện sự tôn trọng!" },
  { english: "You're building successful habits!", vietnamese: "Em đang xây dựng thói quen thành công!" },
  { english: "Punctuality leads to success!", vietnamese: "Đúng giờ dẫn đến thành công!" },
  { english: "You're a responsible learner!", vietnamese: "Em là người học có trách nhiệm!" },
  { english: "I notice your efforts!", vietnamese: "Thầy/Cô nhận thấy nỗ lực của em!" },
  { english: "Your discipline is admirable!", vietnamese: "Kỷ luật của em thật đáng ngưỡng mộ!" },
  { english: "You're showing professionalism!", vietnamese: "Em đang thể hiện tính chuyên nghiệp!" },
  { english: "Right on schedule!", vietnamese: "Đúng lịch trình!" },
  { english: "You're learning valuable skills!", vietnamese: "Em đang học những kỹ năng quý giá!" },
  { english: "Your reliability is noteworthy!", vietnamese: "Sự đáng tin cậy của em thật đáng chú ý!" },
  { english: "You've got the right attitude!", vietnamese: "Em có thái độ đúng đắn!" },
  { english: "Future success awaits you!", vietnamese: "Thành công tương lai đang chờ đón em!" },
  { english: "You're displaying excellence!", vietnamese: "Em đang thể hiện sự xuất sắc!" },
  { english: "Timeliness matters! Well done!", vietnamese: "Đúng giờ rất quan trọng! Làm tốt lắm!" },
  { english: "You're a dependable student!", vietnamese: "Em là học sinh đáng tin cậy!" },
  { english: "Your work ethic shines!", vietnamese: "Đạo đức làm việc của em thật tỏa sáng!" },
  { english: "Keep shining bright!", vietnamese: "Hãy tiếp tục tỏa sáng!" }
];

// Function to get a random element from the array
function getRandomMotivationalPhrase(array) {
  // Generate a random index between 0 and array.length-1
  const randomIndex = Math.floor(Math.random() * array.length);
  
  // Return the element at the random index
  return array[randomIndex];
}

// Example usage
const randomPhrase = getRandomMotivationalPhrase(motivationalPhrases);


export async function handleDailyAssignment(bot) {
  bot.on(message("text"), async (ctx) => {
    logger.debug("Received message", {
      chat: ctx.chat,
      message: ctx.message,
      ...ctx,
    });

    const msg = ctx.message.text;
    const submitHashtag = "#submit"
    const includeSubmitTag  = msg.includes(submitHashtag);
    const messageText = msg;

    if (!includeSubmitTag) return;

    const motivation = getRandomMotivationalPhrase(motivationalPhrases)
    const motivationText = `${motivation.english}(${motivation.vietnamese})`
    ctx.reply(motivationText)

    const { announcementCreatedDate, announcementCreatedTime } = formatDateTime(
      new Date(ctx.message.date * 1000)
    );
    const username = ctx.from.username || `user_${ctx.from.id}`;
    const firstName = ctx.message.from.first_name;
    const lastName = ctx.message.from.last_name || "";

    await appendToSheet(
      {
        announcementCreatedDate: announcementCreatedDate,
        announcementCreatedTime: announcementCreatedTime,
        username: username,
        nameOfUser: `${firstName} ${lastName}`,
        messageContent: messageText.trim(),
      },
      sheets
    );
  });
}

async function appendToSheet(data, sheets) {
  const values = [
    [
      data.announcementCreatedDate,
      data.announcementCreatedTime,
      data.username,
      data.nameOfUser,
      data.messageContent,
    ],
  ];
  logger.debug("Upload data to sheet", data);

  const dataStartFrom = "A2";
  await sheets.spreadsheets.values.append({
    spreadsheetId: config.SPREADSHEET_ID,
    range: `${config.SHEET_NAME_ANNOUNCEMENT}!${dataStartFrom}`,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
}
