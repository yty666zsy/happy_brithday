// 全局变量
const birthdayMap = {
    2024: "2024-11-01",
}
const $btn = $("#birth-start-btn")
const $main = $(".main")
let intervalId = null
let snowflakes = null

// 页面加载完成
$(document).ready(function () {
    // 雪花飞舞
    snowflakes = new Snowflakes({
        color: "#ffd700",
        minSize: 20,
    })
    // 淡出内容
    $main.fadeOut(1)
    // 生日倒计时
    intervalId = setInterval(birthdayCountdown, 1000)
    // 按钮点击
    $btn.click(pageRender)
})

function birthdayCountdown() {
    // 获取当前时间和今年生日
    const now = dayjs()
    const curYearStr = now.format("YYYY")
    let birthday = dayjs(birthdayMap[curYearStr])

    // 生日当天关闭倒计时，解锁按钮支持可点击
    if (now.format("YYYY-MM-DD") === birthday.format("YYYY-MM-DD")) {
        clearInterval(intervalId)
        $btn.text("来吧，展示")
        $btn.prop("disabled", false)
        return
    }

    // 今年生日已过则计算距明年生日的时间: before - birthday < now - after
    if (now.isAfter(birthday)) {
        birthday = dayjs(birthdayMap[parseInt(curYearStr) + 1])
    }

    // 计算与目标日期的差值（秒），并转换成天、时、分、秒
    const diffInSeconds = birthday.diff(now, "second")
    const days = Math.floor(diffInSeconds / (3600 * 24))
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60)
    const seconds = diffInSeconds % 60

    // 构建时间字符串
    const timeStrArr = []
    if (days > 0) {
        timeStrArr.push(`${days}天`)
    }
    if (hours > 0 || days > 0) {
        timeStrArr.push(`${hours}时`)
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        timeStrArr.push(`${minutes}分`)
    }
    timeStrArr.push(`${seconds}秒`)

    $btn.text(diffInSeconds <= 0 ? "指定日期生日已过" : timeStrArr.join(""))
}

function pageRender() {
    // 关闭雪花、淡出封面
    snowflakes.destroy()
    $(".birth-cover-container").fadeOut(1500)

    // 淡入内容、播放歌曲、放飞气球、展示祝词
    $main.fadeIn("slow")
    $(".song")[0].play()
    $(".brith-balloon").animate({ top: -500 }, 8000)
    new Typed("#typed", {
        stringsElement: "#greeting-word",
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
    })
}

